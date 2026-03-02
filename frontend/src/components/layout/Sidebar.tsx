import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { cn } from '@/utils/cn';
import toast, { Toaster } from 'react-hot-toast';
import  { navItems }  from './navItem';




export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <aside
      className="
        hidden md:flex md:flex-col
        fixed inset-y-0 left-0 z-40
        w-64 bg-background border-r border-border
        shadow-sm
      "
    >
      {/* Header opcional (logo ou app name) */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Your App</h2>
        {/* ou <img src="logo" alt="Logo" className="h-8" /> */}
      </div>
       <Toaster
        containerStyle={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        toastOptions={{
          style: { minWidth: "200px", textAlign: "center" },
          duration: 4000,
        }}
      />

      {/* Lista de itens */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = !item.isLogout && location.pathname === item.path;
          const isLogoutItem = item.isLogout;

          const handleClick = async () => {
            if (isLogoutItem) {
              try {
            
                await signOut();
                navigate('/auth/login');
              } catch (err) {
                console.error('Logout failed:', err);
                 toast.error("Logout failed. Please try again.");
              }
            } else {
              navigate(item.path);
            }
          };

          return (
            <button
              key={item.label}
              onClick={handleClick}
              className={cn(
                'flex items-center gap-3 w-full px-4 py-3 rounded-md text-left',
                'transition-colors duration-200',
                isActive
                  ? 'bg-accent text-accent-foreground font-medium border-l-4 border-primary pl-3'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                isLogoutItem && 'text-destructive hover:bg-destructive/10 hover:text-destructive'
              )}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}