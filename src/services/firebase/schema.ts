/**
 * Firestore collection map.
 *
 * Centralizing collection names avoids typo'd string literals
 * scattered across services, and gives one place to see the whole
 * data architecture at a glance.
 *
 * Top-level collections (Phase 0 scope):
 *   users              /users/{userId}
 *   customerProfiles   /customerProfiles/{userId}
 *   products           /products/{productId}
 *   categories         /categories/{categoryId}
 *   carts              /carts/{userId}
 *   orders             /orders/{orderId}
 *     orderItems are embedded on the Order document (see types/entities.ts)
 *     rather than a separate top-level collection — order items are
 *     never queried independently of their order, so a subcollection
 *     or extra collection would only add write complexity.
 *   wishlists          /wishlists/{userId}
 *   luxuryRequests     /luxuryRequests/{requestId}
 *
 * Deliberately NOT created yet (future phases, see project brief §7):
 *   suppliers, sourcingRecords, productOffers, vipCustomers,
 *   privateCollections, sellers, sellerApplications, commissions,
 *   marketplaceProducts
 *
 * Nothing above precludes adding those later: `Product.categoryIds`
 * is already an array (ready for multi-source marketplace listings),
 * and `User.role` is a union that can grow ("seller", "vip") without
 * a migration.
 *
 * Internal-only data (e.g. concierge notes on a LuxuryRequest) should
 * live in an admin-only subcollection such as
 * `/luxuryRequests/{requestId}/internalNotes/{noteId}`, protected by
 * the admin-only rule in firestore.rules, rather than as a field on
 * the customer-readable document.
 */
export const COLLECTIONS = {
  users: "users",
  customerProfiles: "customerProfiles",
  products: "products",
  categories: "categories",
  carts: "carts",
  orders: "orders",
  wishlists: "wishlists",
  luxuryRequests: "luxuryRequests",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
