import { login as authenticate } from "@aledx18/auth";
import { useCallback, useState } from "react";

export type AuthSession = ReturnType<typeof authenticate>;

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);

  const signIn = useCallback((user: string) => {
    const nextSession = authenticate(user);
    setSession(nextSession);

    return nextSession;
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
  }, []);

  return {
    isAuthenticated: session !== null,
    session,
    signIn,
    signOut,
  };
}
