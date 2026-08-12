/**
 * Unified error shape used across Firebase, auth, validation, and
 * future API/AI/payment services. Every service should translate
 * its native errors into an `AppError` before it reaches UI code,
 * so components never branch on provider-specific error shapes.
 */

export type AppErrorCode =
  | "auth/invalid-credentials"
  | "auth/not-authenticated"
  | "auth/not-authorized"
  | "auth/email-in-use"
  | "validation/invalid-input"
  | "data/not-found"
  | "data/write-failed"
  | "network/unreachable"
  | "unknown";

export interface AppError {
  code: AppErrorCode;
  /** Friendly, customer-safe message. Never includes stack traces, provider error text, or internal identifiers. */
  message: string;
  /** Optional field-level messages for form validation. */
  fieldErrors?: Record<string, string>;
  /** Original error, kept for logging only — never rendered to the customer. */
  cause?: unknown;
}

const FRIENDLY_MESSAGES: Record<AppErrorCode, string> = {
  "auth/invalid-credentials": "That email or password doesn't look right. Please try again.",
  "auth/not-authenticated": "Please sign in to continue.",
  "auth/not-authorized": "You don't have permission to do that.",
  "auth/email-in-use": "An account with that email already exists.",
  "validation/invalid-input": "Please check the highlighted fields and try again.",
  "data/not-found": "We couldn't find what you were looking for.",
  "data/write-failed": "Something went wrong saving your changes. Please try again.",
  "network/unreachable": "We're having trouble connecting. Please check your connection and try again.",
  unknown: "Something unexpected happened. Please try again in a moment.",
};

/** Builds a customer-safe AppError. Use this at every service boundary rather than throwing raw provider errors. */
export function createAppError(code: AppErrorCode, options?: { fieldErrors?: Record<string, string>; cause?: unknown }): AppError {
  return {
    code,
    message: FRIENDLY_MESSAGES[code],
    fieldErrors: options?.fieldErrors,
    cause: options?.cause,
  };
}

/** Type guard for narrowing unknown catch values to AppError. */
export function isAppError(value: unknown): value is AppError {
  return typeof value === "object" && value !== null && "code" in value && "message" in value;
}

/**
 * Logs the full technical detail (dev console / future error-reporting
 * integration) while guaranteeing only the friendly `message` is ever
 * surfaced to the customer-facing UI.
 */
export function logAppError(error: AppError, context?: string) {
  // eslint-disable-next-line no-console
  console.error(`[AppError]${context ? ` ${context}:` : ""}`, error.code, error.cause ?? "");
}
