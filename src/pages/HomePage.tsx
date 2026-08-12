import { Link } from "react-router-dom";

/**
 * Placeholder landing page. Phase 0 scope is foundation, not the
 * full storefront — this exists to prove the design tokens, layout,
 * and routing work end to end. Real merchandising content, product
 * grids, and imagery arrive in a later phase.
 */
export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <p className="eyebrow">Curated Luxury Fashion</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] md:text-6xl">
        Pieces found for you, not just sold to you.
      </h1>
      <p className="mt-6 max-w-md text-ink-soft">
        Browse a personally sourced collection, or tell us what you're looking for and let our
        concierge find it.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          to="/shop"
          className="inline-flex items-center justify-center bg-ink px-6 py-3 text-sm tracking-wide text-bone transition-colors duration-200 hover:bg-ink/90"
        >
          Explore the Collection
        </Link>
        <Link to="/requests" className="link-reveal text-sm">
          Request a Luxury Item
        </Link>
      </div>
    </div>
  );
}
