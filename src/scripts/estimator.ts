/**
 * Budget estimator (Home 1.8). See Estimator.astro for the full flow.
 *
 * Step 1: "Show my estimate" checks the three choices, then reveals the
 *         name + phone fields.
 * Step 2: "Show my estimate" again validates them, sends everything to
 *         Web3Forms, fires generate_lead (+ Meta Lead), and shows the range.
 */

type Config = {
  key: string;
  pricing: { ranges: Record<string, Record<string, [number, number]>>; finishMultiplier: Record<string, number> } | null;
  placeholderPrices: boolean;
  simulate: boolean;
  whatsappBase: string;
  error: string;
};

declare global {
  interface Window {
    skeTrack?: (name: string, params?: Record<string, unknown>) => void;
  }
}

const ENDPOINT = 'https://api.web3forms.com/submit';

/** Indian mobile: 10 digits starting 6–9, with or without +91 / 91 / 0 in front */
export function normalisePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

/** ₹3,50,000 style (Indian digit grouping), rounded to the nearest ₹10,000 */
const rupees = (n: number) =>
  '₹' + (Math.round(n / 10000) * 10000).toLocaleString('en-IN', { maximumFractionDigits: 0 });

document.querySelectorAll<HTMLFormElement>('[data-estimator]').forEach((form) => {
  const config: Config = JSON.parse(form.dataset.config || '{}');
  const gate = form.querySelector<HTMLElement>('[data-gate]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const formError = form.querySelector<HTMLElement>('[data-form-error]')!;
  const result = form.querySelector<HTMLElement>('[data-result]')!;
  const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!;
  const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]')!;
  const submitLabel = submit.textContent;

  // With JavaScript, the details come after the choices (without it, all show)
  gate.hidden = true;

  const choice = (name: string) =>
    form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? '';

  /** Show or clear a field's error (the error line lives in Field.astro) */
  function fieldError(input: HTMLInputElement, message: string) {
    const field = input.closest('.field')!;
    const slot = field.querySelector<HTMLElement>('[data-field-error]')!;
    slot.querySelector('span')!.textContent = message;
    slot.hidden = !message;
    field.classList.toggle('field--error', !!message);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', slot.id);
    } else {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  // Clear a field's error as soon as the visitor fixes it
  nameInput.addEventListener('input', () => nameInput.value.trim() && fieldError(nameInput, ''));
  phoneInput.addEventListener('input', () => normalisePhone(phoneInput.value) && fieldError(phoneInput, ''));
  form.addEventListener('change', () => {
    if (choice('property') && choice('scope') && choice('finish')) formError.textContent = '';
  });

  function busy(on: boolean) {
    submit.disabled = on;
    submit.textContent = on ? 'Sending…' : submitLabel;
  }

  async function send(data: Record<string, string>) {
    if (config.simulate) {
      console.warn('[estimator] No PUBLIC_WEB3FORMS_KEY: submission simulated, nothing sent.', data);
      await new Promise((r) => setTimeout(r, 400));
      return;
    }
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) throw new Error(json.message || `HTTP ${res.status}`);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const property = choice('property');
    const scope = choice('scope');
    const finish = choice('finish');

    // Step 1: the three choices
    if (!property || !scope || !finish) {
      formError.textContent = 'Choose a property, a scope and a finish to see your estimate.';
      form.querySelector<HTMLInputElement>(
        `input[name="${!property ? 'property' : !scope ? 'scope' : 'finish'}"]`,
      )?.focus();
      return;
    }
    formError.textContent = '';
    if (gate.hidden) {
      gate.hidden = false;
      nameInput.focus();
      return;
    }

    // Step 2: name and phone
    const name = nameInput.value.trim();
    const phone = normalisePhone(phoneInput.value);
    fieldError(nameInput, name ? '' : 'Enter your name.');
    fieldError(phoneInput, phone ? '' : 'Enter a 10-digit mobile number, for example 98945 88673.');
    if (!name) return nameInput.focus();
    if (!phone) return phoneInput.focus();

    // The range (only when prices may be shown)
    let range = '';
    const base = config.pricing?.ranges[property]?.[scope];
    if (config.pricing && base) {
      const m = config.pricing.finishMultiplier[finish] ?? 1;
      range = `${rupees(base[0] * m)} – ${rupees(base[1] * m)}`;
    }

    const honeypot = form.querySelector<HTMLInputElement>('input[name="botcheck"]');
    const data: Record<string, string> = {
      access_key: config.key,
      subject: 'New estimator lead from skeinteriors.com',
      from_name: 'SKE Interiors website',
      form: 'Home: budget estimator',
      name,
      phone: `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`,
      property,
      scope,
      finish,
      estimate_shown: range || 'Not shown (prices not approved yet)',
      botcheck: honeypot?.checked ? 'on' : '',
    };

    busy(true);
    try {
      await send(data);
    } catch (err) {
      console.error('[estimator] Send failed:', err);
      formError.textContent = config.error;
      busy(false);
      return;
    }

    window.skeTrack?.('generate_lead', { form: 'estimator', property, scope, finish });

    // Show the result
    const summary = `${property}, ${scope.toLowerCase()}, ${finish.toLowerCase()} finish`;
    result.querySelector('[data-result-label]')!.textContent = range ? `Indicative range · ${summary}` : summary;
    result.querySelector('[data-range]')!.textContent = range;
    const thanks = result.querySelector<HTMLElement>('[data-thanks]')!;
    thanks.hidden = !!range;
    result.querySelector<HTMLElement>('[data-small]')!.hidden = !range; // small print only goes with a range
    thanks.textContent = range ? '' : `Thanks, ${name}. We've got your details and will call you with your estimate.`;
    if (range && config.placeholderPrices) {
      const note = document.createElement('span');
      note.className = 'estimate__placeholder';
      note.dataset.placeholder = '';
      note.textContent = ' PLACEHOLDER PRICES';
      result.querySelector('[data-range]')!.append(note);
    }

    const message =
      `Hi SKE Interiors, I'm ${name}. I used the budget estimator on your website: ` +
      `${summary}${range ? ` (${range})` : ''}. Please call me on ${data.phone}.`;
    result.querySelector<HTMLAnchorElement>('[data-whatsapp]')!.href =
      config.whatsappBase.replace(/text=.*$/, `text=${encodeURIComponent(message)}`);

    form.setAttribute('data-done', '');
    result.hidden = false;
    result.focus();
    busy(false);
  });
});

export {};
