import { useAuth } from "@/context/useAuth";
import { HEADER_CONFIG } from "@/components/layout/header/header.config";


export function useHeader() {
    const {user} = useAuth();



    const isAuthenticated = !!user;

    return {
        appName: HEADER_CONFIG.appName,
        profileHref: HEADER_CONFIG.profileHref,
        isAuthenticated, 
        showProfileButton: isAuthenticated
    };
}