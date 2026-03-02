  
  import { FaHome, FaPlusCircle, FaListAlt, FaChartLine, FaSignOutAlt } from 'react-icons/fa'

  export  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: <FaHome className="text-2xl" />,
      isLogout: false,
    },
    {
      label: "Create",
      path: "/create",
      icon: <FaPlusCircle className="text-2xl" />,
      isLogout: false,
    },
    {
      label: "Challenges",
      path: "/challenges",
      icon: <FaListAlt className="text-2xl" />,
      isLogout: false,
    },
    {
      label: "Heatmap",
      path: "/heatmap",
      icon: <FaChartLine className="text-2xl" />,
      isLogout: false,
    },
    {
      label: "Logout",
      isLogout: true,
      icon: <FaSignOutAlt className="text-2xl" />,
    },
  ] as const;