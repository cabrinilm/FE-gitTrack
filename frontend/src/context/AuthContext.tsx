
import { createContext, useState } from "react";

import type { User, Session, AuthError } from "@supabase/supabase-js";
// type 


type AuthResponse = {
  user: User | null
  session: Session | null
  error: AuthError | null
};

interface AuthContextValue {
    user: User | null,
    isLoading: boolean, 
    error: string | null
    signIn: (email: string, password: string) => Promise<AuthResponse>
    signOut: () => Promise<void>
    signUp: (
        email: string, 
        password: string,
        username: string, 
    ) => Promise<AuthResponse>
};

export const AuthContext = createContext<AuthContextValue | null>(null)