import { useState, useEffect, type ReactNode } from "react"
import { AuthContext } from "./AuthContext"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import type { AuthResponse } from "./types"

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRecoveryMode, setIsRecoveryMode] = useState(false)

  // =========================
  // Funções de autenticação
  // =========================

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (!data.user) throw new Error("User not found")

      setUser(data.user)
      return { user: data.user, session: data.session ?? null, error: null }
    } catch (err: any) {
      setUser(null)
      setError(err.message)
      return { user: null, session: null, error: err }
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, username: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      })
      if (error) throw error
      if (!data.user) throw new Error("User not found")

      setUser(data.user)
      return { user: data.user, session: data.session ?? null, error: null }
    } catch (err: any) {
      setUser(null)
      setError(err.message)
      return { user: null, session: null, error: err }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const recoverPassword = async (email: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true)
      setError(null)

      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error

      return { user: null, session: null, error: null }
    } catch (err: any) {
      setError(err.message)
      return { user: null, session: null, error: err }
    } finally {
      setIsLoading(false)
    }
  }

  const resetPasswordWithToken = async (newPassword: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error

      return { user: data.user, session: null, error: null }
    } catch (err: any) {
      setError(err.message)
      return { user: null, session: null, error: err }
    } finally {
      setIsLoading(false)
    }
  }

  // =========================
  // Checagem inicial de sessão
  // =========================
  useEffect(() => {
    // Detecta hash do recovery link
    const hash = window.location.hash
    if (hash.includes("type=recovery")) {
      setIsRecoveryMode(true)
    }

    const checkInitialSession = async () => {
      setIsCheckingSession(true)
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user ?? null)
      } catch (err: any) {
        console.error("Erro ao carregar sessão inicial:", err)
        setUser(null)
        setError(err.message)
      } finally {
        setIsCheckingSession(false)
      }
    }

    checkInitialSession()

    // Listener de auth events (SIGNED_IN, SIGNED_OUT, PASSWORD_RECOVERY)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, session ? "Sessão ativa" : "Sem sessão")

      if (event === "SIGNED_IN" || event === "PASSWORD_RECOVERY") {
        setUser(session?.user ?? null)
      }

      if (event === "SIGNED_OUT") {
        setUser(null)
      }

      if (event === "PASSWORD_RECOVERY") {
        setIsRecoveryMode(true)
        console.log("Modo PASSWORD_RECOVERY ativado")
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  // =========================
  // Provider
  // =========================
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isCheckingSession,
        error,
        isRecoveryMode,
        signIn,
        signOut,
        signUp,
        recoverPassword,
        resetPasswordWithToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}