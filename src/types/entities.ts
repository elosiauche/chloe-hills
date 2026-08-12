/**
 * Core domain entities for CHLOE HILLS.
 *
 * These mirror the Firestore collections defined in
 * `src/services/firebase/schema.ts`. Keep this file the single
 * source of truth for shapes shared between client and any future
 * server-side functions.
 */

// ---------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------

/** ISO 8601 timestamp string (Firestore Timestamps are converted at the data layer). */
export type ISODateString = string;

export type Money = {
  /** Amount in the smallest currency unit (e.g. cents) to avoid float error. */
  amountMinor: number;
  currency: "USD" | "GBP" | "EUR";
};

// ---------------------------------------------------------------
// Users & customer profiles
// ---------------------------------------------------------------

export type UserRole = "customer" | "admin";

/** Mirrors Firebase Auth user plus role metadata. Written on signup, read-only to clients otherwise. */
export interface User {
  id: string; // Firebase Auth UID
  email: string;
  displayName?: string;
  role: UserRole;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/**
 * Extended, mutable profile data separate from `User` so that
 * account/auth concerns stay isolated from preference/PII concerns.
 * This split also gives future VIP/marketplace features a natural
 * home without touching the auth-linked `User` document.
 */
export interface CustomerProfile {
  id: string; // same as User.id
  firstName?: string;
  lastName?: string;
  phone?: string;
  shippingAddresses: Address[];
  billingAddress?: Address;
  preferences?: {
    sizes?: string[];
    preferredCategories?: string[];
  };
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Address {
  id: string;
  label?: string; // "Home", "Office"
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// ---------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategoryId?: string | null;
  heroImageUrl?: string;
  displayOrder?: number;
}

export type ProductStatus = "draft" | "published" | "archived";

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  sku: string;
  stockQuantity: number;
  priceOverride?: Money;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  brand?: string;
  categoryIds: string[];
  basePrice: Money;
  images: string[]; // Firebase Storage URLs
  variants: ProductVariant[];
  materials?: string[];
  status: ProductStatus;
  featured?: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// ---------------------------------------------------------------
// Cart (client-held; persisted per-user for logged-in sessions)
// ---------------------------------------------------------------

export interface CartItem {
  productId: string;
  variantId: string;
  name: string; // denormalized snapshot for display without refetch
  imageUrl?: string;
  unitPrice: Money;
  quantity: number;
}

export interface Cart {
  id: string; // userId for logged-in carts
  items: CartItem[];
  updatedAt: ISODateString;
}

// ---------------------------------------------------------------
// Orders
// ---------------------------------------------------------------

export type OrderStatus =
  | "pending" // created, awaiting payment
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "unpaid" | "authorized" | "paid" | "failed" | "refunded";

/**
 * Payment fields are modeled now, per Phase 0 scope, but no
 * provider is wired up. `provider` stays a union so a real
 * integration can be added later without a schema migration.
 */
export interface PaymentDetails {
  status: PaymentStatus;
  provider?: "stripe" | "manual" | null;
  transactionReference?: string;
  amount?: Money;
  paidAt?: ISODateString;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  imageUrl?: string;
  unitPrice: Money;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: Money;
  shippingCost: Money;
  total: Money;
  shippingAddress: Address;
  billingAddress?: Address;
  status: OrderStatus;
  payment: PaymentDetails;
  trackingNumber?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// ---------------------------------------------------------------
// Wishlist
// ---------------------------------------------------------------

export interface WishlistItem {
  productId: string;
  addedAt: ISODateString;
}

export interface Wishlist {
  id: string; // userId
  items: WishlistItem[];
  updatedAt: ISODateString;
}

// ---------------------------------------------------------------
// Luxury Requests ("Request a Luxury Item")
// ---------------------------------------------------------------

export type LuxuryRequestStatus =
  | "submitted"
  | "under_review"
  | "sourcing"
  | "fulfilled"
  | "unable_to_fulfill";

export interface LuxuryRequest {
  id: string;
  userId: string;
  itemDescription: string;
  brandPreference?: string;
  budgetRange?: { min: Money; max: Money };
  referenceImageUrls?: string[];
  status: LuxuryRequestStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
