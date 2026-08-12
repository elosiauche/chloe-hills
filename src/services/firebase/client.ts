import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { firebasePublicConfig } from "../../config/env";

/**
 * Single Firebase app instance for the client bundle. Guarded
 * against re-initialization, which Vite's dev-server HMR can
 * otherwise trigger.
 */
export const firebaseApp: FirebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebasePublicConfig);

export const auth: Auth = getAuth(firebaseApp);
export const db: Firestore = getFirestore(firebaseApp);
export const storage: FirebaseStorage = getStorage(firebaseApp);
