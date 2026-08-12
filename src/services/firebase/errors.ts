import { FirebaseError } from "firebase/app";
import { type AppError, createAppError } from "../../types/errors";

/**
 * Translates a Firebase Auth/Firestore/Storage error into the app's
 * unified `AppError` shape. Call this at every Firebase service
 * boundary — UI code should never see a raw FirebaseError.
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return createAppError("auth/invalid-credentials", { cause: error });
      case "auth/email-already-in-use":
        return createAppError("auth/email-in-use", { cause: error });
      case "permission-denied":
        return createAppError("auth/not-authorized", { cause: error });
      case "not-found":
        return createAppError("data/not-found", { cause: error });
      case "unavailable":
        return createAppError("network/unreachable", { cause: error });
      default:
        return createAppError("unknown", { cause: error });
    }
  }
  return createAppError("unknown", { cause: error });
}
