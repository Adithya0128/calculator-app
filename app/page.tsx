"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Dashboard Title */}
      <motion.h1
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Dashboard
      </motion.h1>

      {/* Calculators Heading */}
      <motion.h2
        className="text-3xl font-semibold mb-6 text-gray-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Calculators
      </motion.h2>

      {/* Calculator Options */}
      <div className="flex gap-6">
        {["Apple", "Samsung", "Xiaomi"].map((brand, index) => (
          <Link key={brand} href={`/${brand.toLowerCase()}`}>
            <motion.div
              className="px-6 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {brand}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
