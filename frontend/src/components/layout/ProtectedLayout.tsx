import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import { BottomNav } from "../BottomNav";

export function ProtectedLayout() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* 
        Aqui no futuro colocaremos a Sidebar quando NÃO for mobile
        Por enquanto deixamos vazio
      */}
      {/* Área principal onde as páginas aparecem */}
      <main
        className={cn(
          "min-h-screen",
          "transition-all duration-300 ease-in-out",
          !isMobile && "md:pl-64", // espaço à esquerda no desktop
          isMobile && "pb-16", // espaço embaixo no mobile
        )}
      >
        {/* Aqui renderiza o conteúdo da rota atual (Home, CreateChallenge, etc.) */}
        <Outlet />
      </main>
      {isMobile && <BottomNav />}
      {/* 
        Aqui no futuro colocaremos o BottomNav quando for mobile
        Por enquanto deixamos vazio
      */}
    </div>
  );
}
