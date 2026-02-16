import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoanding] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
   
    try {

          setIsLoanding(true);
    setError(null);
 

    const {data , error} = await supabase.auth.signInWithPassword({email, password})

  if(error) throw error
  if (!data.user) throw new Error("Invalid user")

  setUser(data.user)
  } catch (err: any){
    setUser(null)
    setError(err.message)
  } finally {
    setIsLoanding(false)
  }

  useEffect(() => {
    setIsLoanding(true)
    setError(null)

    const checkSession = async () => {
      try {
        const {data, error} = await supabase.auth.getSession()

        if(error) throw error
        if(data.session?.user) {
          setUser(data.session.user)
        } else {
          setUser(null)
        }
      } catch(err: any) {
        setError(err.message)
        setUser(null)
      } finally {
        setIsLoanding(false)

      }
    }
   checkSession()
  }, [])


  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};
};
