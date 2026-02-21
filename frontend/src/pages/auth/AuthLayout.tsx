import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-xl border border-border p-8 shadow-xl">
        <Outlet />
      </div>
    </div>
  );
};
