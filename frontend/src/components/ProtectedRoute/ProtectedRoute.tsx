import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/context/useAuth"

export const ProtectedRoute = () => {
  const { user, isCheckingSession, isRecoveryMode } = useAuth()
  const location = useLocation()

  // Se ainda estamos checando a sessão, não renderiza nem redireciona
  if (isCheckingSession) return null

  // Se estamos em recovery mode, permite acesso mesmo sem user
  if (isRecoveryMode) return <Outlet />

  // Se não tem usuário, redireciona para login
  if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />

  // Usuário logado
  return <Outlet />
}