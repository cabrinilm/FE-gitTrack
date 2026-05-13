  
  import { FaHome, FaPlusCircle, FaListAlt, FaChartLine, FaSignOutAlt } from 'react-icons/fa'

  export  const navItems = [
    {
      label: "Home",
      path: "/app",
      icon: <FaHome className="text-2xl" />,
      isLogout: false,
    },
    {
      label: "Create",
      path: "/app/create",
      icon: <FaPlusCircle className="text-2xl" />,
      isLogout: false,
    },
    {
      label: "Challenges",
      path: "/app/challenges",
      icon: <FaListAlt className="text-2xl" />,
      isLogout: false,
    },
    {
      label: "Heatmap",
      path: "/app/heatmap",
      icon: <FaChartLine className="text-2xl" />,
      isLogout: false,
    },
    {
      label: "Logout",
      isLogout: true,
      icon: <FaSignOutAlt className="text-2xl" />,
    },
  ] as const;