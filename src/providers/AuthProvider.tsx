import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initialize session check and sign in, if needed
    const initializeAuth = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        if (currentSession) {
          setSession(currentSession);
        } else {
          // No session exists, sign in anonymously
          const { error } = await supabase.auth.signInAnonymously();
          if (error) throw error;
        }
      } catch (error) {
        console.error("Authentication initialization failed", error);
      } finally {
        setIsLoading(false);
      }

      initializeAuth();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: session?.user || null, isAuthenticated: !!session }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
