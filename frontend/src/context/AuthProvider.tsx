import { useState, useEffect, type ReactNode } from "react"
import { AuthContext } from "./AuthContext"
import type { User, Session, AuthError } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"

// Tipo do retorno das funções de autenticação
type AuthResponse = {
  user: User | null
  session: Session | null
  error: AuthError | null
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)


  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) throw error
      if (!data.user) throw new Error("Usuário não retornado pelo servidor")

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
      if (!data.user) throw new Error("Usuário não retornado pelo servidor")

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


  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.getSession()
        if (error) throw error

        if (data.session?.user) {
          setUser(data.session.user)
        } else {
          setUser(null)
        }
      } catch (err: any) {
        setUser(null)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};
