import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-ink text-bone hover:bg-ink/90",
  secondary: "border border-hairline-strong text-ink hover:border-ink",
  ghost: "text-ink hover:text-gold",
};

/**
 * Base button. Deliberately square-cornered and quiet — luxury
 * commerce reads restraint as confidence, not excitement.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center px-6 py-3 text-sm tracking-wide transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40 ${VARIANT_CLASSES[variant]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
