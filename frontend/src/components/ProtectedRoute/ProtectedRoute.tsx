import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import type { ProtectedRouteProps } from "./types";


export function ProtectedRoute(props: ProtectedRouteProps){

    const {user, isLoading} = useAuth();

  if(isLoading){
    return props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-text-secondary">Verifying Authentication</p>
        </div>
    );
  }

if(!user){
    const to = props.redirectTo || "/login";
    return <Navigate to={to} replace />
}

return props.children || <Outlet />;

};