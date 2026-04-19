import { useAuth } from "@/context/useAuth";
import { HEADER_CONFIG } from "@/components/layout/Header/header.config";


export function useHeader() {
    const {user} = useAuth();


//const isAuthenticated = user ? true : false;
    const isAuthenticated = !!user;

    return {
        appName: HEADER_CONFIG.appName,
        profileHref: HEADER_CONFIG.profileHref,
        isAuthenticated, 
        showProfileButton: isAuthenticated
    };
}