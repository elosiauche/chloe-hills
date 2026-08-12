import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./client";
import { COLLECTIONS } from "./schema";
import { toAppError } from "./errors";

const googleProvider = new GoogleAuthProvider();

/** Creates the /users and /customerProfiles documents for a new account. Idempotent via setDoc + merge. */
async function provisionCustomerDocuments(uid: string, email: string, displayName?: string) {
  const now = serverTimestamp();
  await setDoc(
    doc(db, COLLECTIONS.users, uid),
    { id: uid, email, displayName: displayName ?? null, role: "customer", createdAt: now, updatedAt: now },
    { merge: true },
  );
  await setDoc(
    doc(db, COLLECTIONS.customerProfiles, uid),
    { id: uid, shippingAddresses: [], createdAt: now, updatedAt: now },
    { merge: true },
  );
}

export async function signUpWithEmail(email: string, password: string, displayName?: string) {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }
    await provisionCustomerDocuments(credential.user.uid, email, displayName);
    return credential.user;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function signInWithGoogle() {
  try {
    const credential = await signInWithPopup(auth, googleProvider);
    await provisionCustomerDocuments(
      credential.user.uid,
      credential.user.email ?? "",
      credential.user.displayName ?? undefined,
    );
    return credential.user;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw toAppError(error);
  }
}
