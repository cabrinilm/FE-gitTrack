import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import type { AuthResponse } from "./types";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);

  // =========================
  // Funções de autenticação
  // =========================
  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) return { user: null, session: null, error };
    setUser(data.user);
    return { user: data.user, session: data.session ?? null, error: null };
  };

  const signUp = async (
    email: string,
    password: string,
    username: string,
  ): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error || !data.user) return { user: null, session: null, error };
    setUser(data.user);
    return { user: data.user, session: data.session ?? null, error: null };
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (!error) setUser(null);
  };

  const recoverPassword = async (email: string): Promise<AuthResponse> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/auth/reset-password",
    });
    return { user: null, session: null, error: error ?? null };
  };

  const resetPasswordWithToken = async (
    newPassword: string,
  ): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { user: data?.user ?? null, session: null, error: error ?? null };
  };

  // =========================
  // Checagem inicial de sessão
  // =========================
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) setIsRecoveryMode(true);

    const checkInitialSession = async () => {
      setIsCheckingSession(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsCheckingSession(false);
      if (error) console.error("Erro ao carregar sessão inicial:", error);
    };

    checkInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" || event === "PASSWORD_RECOVERY")
          setUser(session?.user ?? null);
        if (event === "SIGNED_OUT") setUser(null);
        if (event === "PASSWORD_RECOVERY") setIsRecoveryMode(true);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  // =========================
  // Provider
  // =========================
  return (
    <AuthContext.Provider
      value={{
        user,
        isCheckingSession,
        isRecoveryMode,
        signIn,
        signOut,
        signUp,
        recoverPassword,
        resetPasswordWithToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
