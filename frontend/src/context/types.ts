import type { User, Session, AuthError } from "@supabase/supabase-js";

export type AuthResponse = {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
};

export interface AuthContextValue {
  user: User | null;
  isCheckingSession: boolean;    
  isRecoveryMode: boolean;       
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    username: string,
  ) => Promise<AuthResponse>;
  recoverPassword: (email: string) => Promise<AuthResponse>;
  resetPasswordWithToken: (newPassword: string) => Promise<AuthResponse>;
}