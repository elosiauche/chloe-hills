# Chloe Hills

Curated luxury fashion platform — customer storefront, accounts,
wishlist, cart, orders, "Request a Luxury Item," and a future AI
concierge. This is **Phase 0**: architecture and foundation only.
No storefront pages, checkout, or AI concierge are implemented yet
— see [Known Issues / Scope](#known-issues--scope) below.

## Tech Stack

- **React 19 + TypeScript**, built with **Vite**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/index.css`)
- **React Router 7** for client-side routing
- **Firebase**: Authentication, Firestore, Storage (client SDK)
- **Netlify**: static hosting + Netlify Functions for anything that
  needs a server-side secret

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in real Firebase config
npm run dev
```

Other scripts:

```bash
npm run build     # type-check (tsc -b) then production build
npm run lint       # oxlint
npm run preview    # serve the production build locally
```

## Environment Variables

See `.env.example` for the full list and explanation. Summary:

- `VITE_FIREBASE_*` — Firebase **client** config. Safe to expose to
  the browser by design (see comment in `src/config/env.ts`);
  real protection is Firestore/Storage security rules.
- Everything else (Firebase Admin key, AI provider key, payment
  secret key, email provider key) is **server-only**, read via
  `process.env` inside `netlify/functions/*`, and must be set in
  the Netlify dashboard — never committed, never `VITE_`-prefixed.

## Firebase Setup

1. Create a Firebase project, enable **Authentication** (Email/Password
   and Google providers), **Firestore**, and **Storage**.
2. Copy the web app config into `.env.local` as the `VITE_FIREBASE_*`
   values.
3. Deploy the security rules:
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```
   Rules live in `firestore.rules` and `storage.rules` at the repo
   root; see the comments in each file for the access model.

Firestore collections used in this phase: `users`, `customerProfiles`,
`products`, `categories`, `carts`, `orders`, `wishlists`,
`luxuryRequests`. See `src/services/firebase/schema.ts` for the
full map and notes on future collections (marketplace, sellers, VIP,
etc.) that this schema is designed to accommodate without a
migration.

## Netlify Deployment

> **Not a developer / just want the site live?** Use `DEPLOY.md` in
> this project — a click-through guide using only the GitHub and
> Netlify websites, no command line required.

`netlify.toml` sets the build command (`npm run build`), publish
directory (`dist`), functions directory (`netlify/functions`), and
an SPA redirect so client-side routes resolve on refresh.

Connect the repo in Netlify, set the server-only environment
variables from `.env.example` in Site settings → Environment
variables, and deploy. `netlify/functions/health.ts` is a
no-secret endpoint you can hit at `/.netlify/functions/health` to
confirm functions are deployed correctly.

## Folder Structure

```
src/
  components/
    ui/          reusable primitives (Button, TextField, loading/empty/error states)
    layout/       Header, Footer
    product/      (empty — reserved for product cards/grids in a later phase)
  layouts/         SiteLayout (header + outlet + footer)
  pages/           route-level components
  services/
    firebase/      client init, schema map, auth service, error translation
    ai/            AIService interface — boundary only, not implemented
    payment/       PaymentService interface — boundary only, not implemented
  context/         AuthContext
  hooks/           useRequireAuth, etc.
  types/           entities.ts (domain model), errors.ts (AppError)
  utils/           formatMoney, etc.
  config/          env.ts — public config only, documents the public/secret split
netlify/
  functions/       server-side code that needs a secret (see its README.md)
firestore.rules     Firestore security rules
storage.rules        Storage security rules
```

## Development Conventions

- **Public vs. secret config**: anything read with `import.meta.env`
  ships to the browser. Secrets live only in Netlify Function
  environment variables. See `src/config/env.ts`.
- **Errors**: services translate provider-specific errors (Firebase,
  future AI/payment providers) into the shared `AppError` type
  (`src/types/errors.ts`) before they reach UI code, so components
  never branch on provider error shapes and customers never see raw
  technical error text.
- **Service boundaries**: `AIService` and `PaymentService` are
  defined as interfaces now so later phases add an implementation
  behind a stable contract instead of wiring a provider SDK directly
  into components.
- **Design tokens**: colors, fonts, and spacing are defined once in
  `src/index.css` under `@theme` and consumed via Tailwind utility
  classes (`bg-bone`, `text-ink`, `font-display`, etc.) — no
  hard-coded hex values in components.

## Known Issues / Scope

This phase intentionally does **not** include: marketplace/seller
features, VIP membership, the AI concierge, checkout/payment
processing, complex analytics, or a mobile app — see project brief
§17. Routes for these areas exist and are navigable but render a
"coming soon" placeholder (`src/pages/ComingSoonPage.tsx`) so the
app is fully clickable end-to-end without pretending unfinished
features are done.

The production JS bundle is ~763 kB (232 kB gzipped), mostly the
Firebase SDK. Acceptable for this phase; worth revisiting with
route-based code-splitting once real pages add more weight.

## Recommended Next Step

Phase 1: build the customer storefront (product grid, product
detail, cart) against the `Product`/`Category`/`Cart` types and
Firestore collections already in place.
