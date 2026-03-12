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

  useEffect(() => {
    const signInIfNeeded = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setSession(data.session);
      }

      if (!data.session) {
        const { data, error } = await supabase.auth.signInAnonymously();

        if (data.session) {
          setSession(data.session);
        } else {
          console.error(error);
        }
      }
    };

    signInIfNeeded();
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
