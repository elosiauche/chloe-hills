import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { to: "/shop", label: "Shop" },
  { to: "/requests", label: "Request a Piece" },
  { to: "/concierge", label: "Concierge" },
];

export function Header() {
  const { firebaseUser } = useAuth();

  return (
    <header className="border-b border-hairline">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="font-display text-xl tracking-[0.08em]">
          CHLOE HILLS
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `link-reveal text-sm ${isActive ? "text-ink" : "text-ink-soft"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/wishlist" className="link-reveal hidden sm:inline">
            Wishlist
          </Link>
          <Link to="/cart" className="link-reveal">
            Cart
          </Link>
          <Link to={firebaseUser ? "/account" : "/sign-in"} className="link-reveal">
            {firebaseUser ? "Account" : "Sign In"}
          </Link>
        </div>
      </div>
    </header>
  );
}
