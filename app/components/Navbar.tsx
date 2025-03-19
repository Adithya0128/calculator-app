"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  if (pathname === "/") return null; // Hide navbar on homepage

  const allLinks = [
    { href: "/apple", label: "Apple Calculator" },
    { href: "/samsung", label: "Samsung Calculator" },
    { href: "/xiaomi", label: "Xiaomi Calculator" },
    { href: "/casio", label: "Casio Calculator" },
    { href: "/dell", label: "Dell Calculator" },
    { href: "/hp", label: "HP Calculator" },
  ];

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 items per page

  // Filter links based on search input
  const filteredLinks = allLinks.filter(link =>
    link.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered results
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const displayedLinks = filteredLinks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.nav
      className="bg-black text-white p-4 flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Home Button */}
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
        Home
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Calculators..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded text-black w-64"
      />

      {/* Navigation Links with Pagination */}
      <div className="flex space-x-6">
        {displayedLinks.map((link, index) => (
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
      </div>

      {/* Pagination Controls */}
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-700"}`}
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-700"}`}
        >
          Next
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
