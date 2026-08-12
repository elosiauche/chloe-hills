export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 text-sm md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-lg tracking-[0.08em]">CHLOE HILLS</p>
          <p className="mt-3 max-w-xs text-ink-soft">
            Curated luxury fashion, personally sourced. If you can't find it, we'll find it for you.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Client Services</p>
          <ul className="flex flex-col gap-2 text-ink-soft">
            <li>Concierge</li>
            <li>Request a Luxury Item</li>
            <li>Shipping &amp; Returns</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">The House</p>
          <ul className="flex flex-col gap-2 text-ink-soft">
            <li>Our Story</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline px-6 py-6 text-center text-xs text-stone md:px-10">
        © {new Date().getFullYear()} Chloe Hills. All rights reserved.
      </div>
    </footer>
  );
}
