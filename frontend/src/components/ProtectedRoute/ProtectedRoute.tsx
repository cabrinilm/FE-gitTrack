import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/context/useAuth"

export const ProtectedRoute = () => {
  const { user, isCheckingSession, isRecoveryMode } = useAuth()
  const location = useLocation()


  if (isCheckingSession) return null

  
  if (isRecoveryMode) return <Outlet />


  if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />


  return <Outlet />
}