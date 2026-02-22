import { useState, useEffect, type ReactNode } from "react"
import { AuthContext} from "./AuthContext"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import type { AuthResponse } from "./types"


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
const resetPasswordWithToken = async (
  newPassword: string
): Promise<AuthResponse> => {
  try {
    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) throw error
    if (!data.user) throw new Error("User not found")

    setUser(data.user)

    return {
      user: data.user,
      session: null,  // nenhuma sessão nova gerada
      error: null,
    }
  } catch (err: any) {
    setError(err.message)

    return {
      user: null,
      session: null,
      error: err,
    }
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
        recoverPassword,
        resetPasswordWithToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};
