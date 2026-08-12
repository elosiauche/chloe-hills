import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "../services/firebase/client";

interface AuthContextValue {
  /** Raw Firebase Auth user, or null when signed out. Undefined while the initial auth check is in flight. */
  firebaseUser: FirebaseUser | null | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ firebaseUser: undefined, isLoading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, isLoading: firebaseUser === undefined }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Access the current auth state anywhere under <AuthProvider>. */
export function useAuth() {
  return useContext(AuthContext);
}
