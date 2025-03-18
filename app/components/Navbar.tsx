"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname(); // Get current route

  if (pathname === "/") return null; // Hide navbar on the homepage

  return (
    <nav className="bg-black text-white p-4 flex justify-center space-x-6">
      <Link href="/apple" className="hover:text-gray-400">Apple Calculator</Link>
      <Link href="/samsung" className="hover:text-gray-400">Samsung Calculator</Link>
      <Link href="/xiaomi" className="hover:text-gray-400">Xiaomi Calculator</Link>
    </nav>
  );
}
