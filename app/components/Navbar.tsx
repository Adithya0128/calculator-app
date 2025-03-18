"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  // Hide navbar on homepage ("/")
  if (pathname === "/") return null;

  const links = [
    { href: "/apple", label: "Apple Calculator" },
    { href: "/samsung", label: "Samsung Calculator" },
    { href: "/xiaomi", label: "Xiaomi Calculator" },
  ];

  return (
    <motion.nav 
      className="bg-black text-white p-4 flex items-center justify-center space-x-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Home Button */}
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
        Home
      </Link>

      {/* Navigation Links */}
      {links.map((link, index) => (
        <motion.div 
          key={link.href} 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          <Link href={link.href} className="hover:text-gray-400">
            {link.label}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default Navbar;
