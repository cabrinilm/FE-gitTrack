import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "@supabase/supabase-js";

interface AuthProviderProps {
    children : ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoanding] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  
  
    // ...



  return (
    <AuthContext.Provider value={/* algo */}>
      {children}
    </AuthContext.Provider>
  )
}