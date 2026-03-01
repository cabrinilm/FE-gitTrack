// src/components/navigation/BottomNav.tsx

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { cn } from '@/utils/cn';
import toast, { Toaster } from 'react-hot-toast';

import {
  FaHome,
  FaPlusCircle,
  FaListAlt,
  FaChartLine,
  FaSignOutAlt,
} from 'react-icons/fa';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: <FaHome className="text-2xl" />, isLogout: false },
    { label: 'Create', path: '/create', icon: <FaPlusCircle className="text-2xl" />, isLogout: false },
    { label: 'Challenges', path: '/challenges', icon: <FaListAlt className="text-2xl" />, isLogout: false },
    { label: 'Heatmap', path: '/heatmap', icon: <FaChartLine className="text-2xl" />, isLogout: false },
    { label: 'Logout', isLogout: true, icon: <FaSignOutAlt className="text-2xl" /> },
  ] as const;

  return (
    <>
      {/* Toaster centralizado na tela */}
      <Toaster
        containerStyle={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        toastOptions={{
          style: { minWidth: '200px', textAlign: 'center' },
          duration: 4000,
        }}
      />

      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          h-16 bg-background border-t border-border
          flex items-center justify-around
          shadow-lg md:hidden
        "
      >
        {navItems.map((item) => {
          const isActive = !item.isLogout && location.pathname === item.path;
          const isLogoutItem = item.isLogout;

          const handleClick = async () => {
            if (isLogoutItem) {
              try {
                      throw new Error('Simulated logout error');

                await signOut();
                navigate('/auth/login');
              } catch (err) {
                console.error('Logout failed:', err);
                toast.error('Logout failed. Please try again.');
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
                'flex flex-col items-center justify-center gap-1',
                'w-full h-full transition-colors duration-200',
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground active:text-primary',
                isLogoutItem && 'text-destructive hover:text-destructive/90 active:text-destructive/70'
              )}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}