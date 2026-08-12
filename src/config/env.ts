/**
 * PUBLIC configuration only.
 *
 * Everything read here comes from Vite `import.meta.env` variables
 * prefixed with `VITE_`, which Vite inlines into the client bundle.
 * That means anything in this file is visible to anyone who opens
 * dev tools — never put secrets behind a VITE_ prefix.
 *
 * Firebase's client SDK config (apiKey, projectId, etc.) is safe to
 * expose this way by design: it identifies the project, it does not
 * authorize access. Actual protection comes from Firestore/Storage
 * security rules (see `firestore.rules`) and Firebase Auth.
 *
 * Server-only secrets (Admin SDK key, payment secret key, AI
 * provider key, email provider key) must NEVER be read with
 * `import.meta.env` / `VITE_` — they belong in Netlify Function
 * environment variables and are read with `process.env` inside
 * `netlify/functions/**`, which never ships to the browser.
 */

function requireEnv(key: string, value: string | undefined): string {
  if (!value) {
    // Fail loudly in development so a missing key is caught before deploy,
    // rather than surfacing as a confusing runtime Firebase error later.
    console.warn(`[env] Missing expected environment variable: ${key}`);
  }
  return value ?? "";
}

export const firebasePublicConfig = {
  apiKey: requireEnv("VITE_FIREBASE_API_KEY", import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: requireEnv("VITE_FIREBASE_AUTH_DOMAIN", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: requireEnv("VITE_FIREBASE_PROJECT_ID", import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: requireEnv("VITE_FIREBASE_STORAGE_BUCKET", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: requireEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: requireEnv("VITE_FIREBASE_APP_ID", import.meta.env.VITE_FIREBASE_APP_ID),
};

export const appConfig = {
  name: "Chloe Hills",
  env: import.meta.env.MODE, // "development" | "production"
  isProduction: import.meta.env.PROD,
};
