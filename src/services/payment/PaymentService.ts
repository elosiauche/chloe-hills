/**
 * Payment service boundary.
 *
 * NOT IMPLEMENTED in Phase 0. The `Order.payment` fields
 * (see types/entities.ts: PaymentDetails) already model status,
 * provider, transaction reference, amount, and timestamp so a real
 * provider can be plugged in later without a data migration.
 *
 * A real implementation must run server-side (Netlify Function),
 * since it requires the payment provider's secret key. The client
 * should only ever call our own function endpoint (e.g.
 * `/.netlify/functions/create-payment-intent`), never the payment
 * provider directly with a secret key.
 */

import type { Money, Order } from "../../types/entities";

export interface CreatePaymentIntentInput {
  orderId: Order["id"];
  amount: Money;
}

export interface CreatePaymentIntentResult {
  clientSecret: string;
  provider: "stripe";
}

export interface PaymentService {
  createPaymentIntent(input: CreatePaymentIntentInput): Promise<CreatePaymentIntentResult>;
}

export const paymentService: PaymentService = {
  async createPaymentIntent() {
    throw new Error("PaymentService.createPaymentIntent is not implemented yet (planned for a later phase).");
  },
};
