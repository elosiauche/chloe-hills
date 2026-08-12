/**
 * Reusable state patterns referenced in the project brief §15.
 * Future pages compose these rather than hand-rolling their own
 * loading/empty/error markup.
 */

/** A single skeleton block. Compose several to build skeleton layouts (e.g. a product grid). */
export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-hairline/60 ${className}`} aria-hidden="true" />;
}

export function SkeletonProductCard() {
  return (
    <div className="flex flex-col gap-3">
      <SkeletonBlock className="aspect-[3/4] w-full" />
      <SkeletonBlock className="h-3 w-2/3" />
      <SkeletonBlock className="h-3 w-1/3" />
    </div>
  );
}

export function LoadingSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 text-stone">
      <span className="h-4 w-4 animate-spin rounded-full border border-hairline-strong border-t-ink" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 border border-hairline px-8 py-16 text-center">
      <h3 className="font-display text-xl">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-soft">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({
  message = "Something unexpected happened. Please try again in a moment.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 border border-error-bg bg-error-bg px-8 py-12 text-center">
      <p className="text-sm text-error">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="link-reveal text-sm">
          Try again
        </button>
      )}
    </div>
  );
}
