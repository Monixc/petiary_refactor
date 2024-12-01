"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth/cognito";

const AuthContext = createContext<{
  user: any;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((userData) => setUser(userData))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
