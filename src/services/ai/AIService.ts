/**
 * AI service boundary.
 *
 * NOT IMPLEMENTED in Phase 0 — this file exists purely so later
 * phases (concierge chat, product discovery, luxury-request
 * assistance, admin analytics) can be added behind a stable
 * interface instead of being wired directly into components.
 *
 * The AI provider's API key must live only in Netlify Function
 * environment variables (`process.env`, never `VITE_`-prefixed) and
 * be called from `netlify/functions/*`. The client should only ever
 * talk to our own Netlify Function endpoints, never to the AI
 * provider directly — see netlify/functions/README.md.
 */

export interface ProductDiscoveryQuery {
  prompt: string;
  categoryHint?: string;
}

export interface LuxuryRequestAssistInput {
  itemDescription: string;
}

export interface LuxuryRequestAssistSuggestion {
  clarifyingQuestions: string[];
  suggestedBrands?: string[];
}

export interface ConciergeMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Shape a future implementation should satisfy. Kept intentionally
 * minimal — each method maps to one Phase-0-deferred feature named
 * in the project brief (§11).
 */
export interface AIService {
  discoverProducts(query: ProductDiscoveryQuery): Promise<{ productIds: string[] }>;
  assistLuxuryRequest(input: LuxuryRequestAssistInput): Promise<LuxuryRequestAssistSuggestion>;
  sendConciergeMessage(history: ConciergeMessage[]): Promise<ConciergeMessage>;
}

/**
 * Placeholder implementation so the rest of the app can import and
 * type-check against `AIService` before any real integration
 * exists. Every method rejects clearly rather than silently
 * returning fake data.
 */
export const aiService: AIService = {
  async discoverProducts() {
    throw new Error("AIService.discoverProducts is not implemented yet (planned for a later phase).");
  },
  async assistLuxuryRequest() {
    throw new Error("AIService.assistLuxuryRequest is not implemented yet (planned for a later phase).");
  },
  async sendConciergeMessage() {
    throw new Error("AIService.sendConciergeMessage is not implemented yet (planned for a later phase).");
  },
};
