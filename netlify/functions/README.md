# Netlify Functions

Server-side code that needs a secret (AI provider key, payment
secret key, email provider key, Firebase Admin credentials) belongs
here, not in `src/`. Anything in `src/` is bundled into the browser.

## Pattern

- Each function is a single file exporting a `handler`.
- Read secrets with `process.env.SOME_KEY` — set the real value in
  the Netlify dashboard (Site settings → Environment variables), and
  document the placeholder in `.env.example` at the project root.
- Functions are called from the client via `fetch("/.netlify/functions/<name>")`.
  The client never imports a provider SDK that needs a secret key.

## Present in Phase 0

- `health.ts` — a trivial endpoint that confirms Netlify Functions
  are wired up and deployable. No secrets, safe to call from
  anywhere.

## Planned for later phases

- `ai-concierge.ts` — proxies chat/discovery requests to the AI
  provider using `AI_PROVIDER_API_KEY`. Implements `AIService` from
  `src/services/ai/AIService.ts`.
- `create-payment-intent.ts` — creates a payment intent using
  `PAYMENT_PROVIDER_SECRET_KEY`. Implements `PaymentService` from
  `src/services/payment/PaymentService.ts`.
- `send-email.ts` — order confirmations / luxury-request receipts
  using `EMAIL_PROVIDER_API_KEY`.
