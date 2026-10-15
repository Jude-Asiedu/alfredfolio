# Contact Form — Implementation Plan

## Goal
Replace the dead "Send Message" button on the About page (and optionally the `mailto:` CTA on the Home page) with a real, working contact form that delivers submissions to Jude's inbox and resists spam. Form submissions are collected by **Netlify Forms** — no backend, no API keys, free up to 100 submissions/month on the current plan.

## Spam strategy (layered)
1. **Honeypot** — hidden `bot-field` input Netlify auto-rejects when filled. Catches ~70% of naive bots.
2. **Akismet** — Netlify runs every submission through it automatically. Catches another ~20%.
3. **Client-side validation** — required fields, email format, min message length, URL-pattern reject. Reduces junk from humans too.
4. **No reCAPTCHA on day 1.** Can be enabled later via `data-netlify-recaptcha="true"` + one script tag; documented in README.

---

## Files to touch

| File | Change |
|---|---|
| [src/index.html](../src/index.html) | Add a **hidden static form** named `contact` with the same field names Netlify's build scanner can detect at deploy time (required for Angular SPAs). |
| [src/app/features/about/about.component.html](../src/app/features/about/about.component.html) | Replace the commented-out form + dead `Send Message` button with a real reactive form (name, email, message, honeypot). Add inline success/error UI. |
| [src/app/features/about/about.component.ts](../src/app/features/about/about.component.ts) | Build a `FormGroup` with validators. Implement `sendForm()` → POST form-encoded data to `/`. Expose `status: 'idle' \| 'sending' \| 'sent' \| 'error'`. |
| [src/app/features/features.module.ts](../src/app/features/features.module.ts) | Import `ReactiveFormsModule`. |
| [src/app/features/home/home.component.html](../src/app/features/home/home.component.html) | Change the "Send me an email" CTA from `mailto:` to a `routerLink="/about"` with `fragment="contact"`. Hides the raw email address from scrapers. |
| [src/app/features/about/about.component.html](../src/app/features/about/about.component.html) | Add `id="contact"` to the form section so the fragment link lands on it. |
| [README.md](../README.md) | Append a short "Contact form" section: how Netlify processes it, where to view submissions, how to add notification emails, how to turn on reCAPTCHA later. |

---

## Form shape

```
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />   <!-- honeypot, visually hidden -->
  <input name="name"    required minlength="2" />
  <input name="email"   required type="email" />
  <textarea name="message" required minlength="10" maxlength="2000"></textarea>
  <button type="submit">Send Message</button>
</form>
```

### Angular reactive form (validators)
- `name`: required, minLength 2, maxLength 80
- `email`: required, `Validators.email`
- `message`: required, minLength 10, maxLength 2000
- `bot-field`: untouched by UI; if non-empty on submit, abort silently (double-check in addition to Netlify)

### Submit flow
```
sendForm() {
  if (this.form.invalid) { mark all touched; return; }
  if (this.form.value['bot-field']) { return; } // honeypot tripped

  this.status = 'sending';
  const body = new URLSearchParams({
    'form-name': 'contact',
    ...this.form.value
  }).toString();

  this.http.post('/', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'text'
  }).subscribe({
    next: () => { this.status = 'sent'; this.form.reset(); },
    error: () => { this.status = 'error'; }
  });
}
```

### UI states
- **idle**: form visible, submit enabled when valid
- **sending**: button shows spinner, inputs disabled
- **sent**: form hidden, success message with teal check icon ("Thanks — I'll get back to you shortly.")
- **error**: inline red banner above submit with retry hint

---

## Post-deploy checklist (user actions)
1. Push to Netlify. First production build triggers Netlify's form scanner — form appears under **Site → Forms**.
2. **Forms → Settings & usage → Form notifications** → add email `jude.asiedu99@gmail.com` (or an alias) for new-submission alerts.
3. Submit a test message from the live site; confirm it arrives in email + appears in dashboard.
4. (Optional later) If spam gets through: add `data-netlify-recaptcha="true"` to the About form, drop the Netlify recaptcha script tag in `index.html`, redeploy.

---

## Out of scope (not in this round)
- reCAPTCHA (documented, not implemented).
- Rate limiting (Netlify Pro feature).
- Admin dashboard inside the app for viewing submissions (Netlify's dashboard covers it).
- Email templating / HTML notification styling (Netlify sends a plain-text summary; sufficient for a portfolio).
- Replacing the raw email reference in [bio.json](../src/assets/json/bio.json) (`jude.asiedu99@gmail.com` still appears in JSON-LD structured data in [index.html](../src/index.html); fine for SEO signal, not useful for scrapers since schema parsers are not spam bots).

---

## Verification
1. `npm run build` — compiles clean.
2. `ng serve --port 4300`, visit `/about`:
   - Submit empty form → validation errors appear inline.
   - Submit invalid email → inline error on email field.
   - Submit valid data → spinner → "sent" state (fails locally because Netlify's `/` POST handler only exists in production — expected; test full flow after Netlify deploy).
3. On live Netlify site: real submission → email arrives + visible in Forms dashboard.
4. Try to trip honeypot (devtools: fill `bot-field`, submit) → submission silently rejected, no email.
