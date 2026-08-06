import { useContext } from "react";
import { AuthContext } from "./context";
import type { AuthContextValue } from "./types";

function useAuthContext(): AuthContextValue {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("authkit hooks must be used within <AuthProvider>.");
  }

  return value;
}

export function useAuth(): AuthContextValue {
  return useAuthContext();
}

export function useUser() {
  const { user, isLoading, isAuthenticated } = useAuthContext();
  return { user, isLoading, isAuthenticated };
}

export function useSession() {
  const { session, isLoading, isAuthenticated } = useAuthContext();
  return { session, isLoading, isAuthenticated };
}
