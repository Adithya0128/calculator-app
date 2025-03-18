"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HomeIcon } from "@heroicons/react/24/solid";



export default function SamsungCalculator() {
  const [showSplash, setShowSplash] = useState(true);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult(null);
  };

  const calculateResult = () => {
    try {
      if (!input) return;

      const formattedInput = input.replace(/÷/g, "/").replace(/×/g, "*");
      setResult(eval(formattedInput).toString());
      setInput(eval(formattedInput).toString());
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 relative">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 5, ease: "easeOut" }}
            exit={{ opacity: 0 }}
          >
            <Image 
              src="/samsung-logo.png" 
              alt="Samsung Logo" 
              layout="fill" 
              objectFit="cover" 
              className="w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Button */}
      {!showSplash && (
    <Link href="/" className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition">
        <HomeIcon className="w-6 h-6 text-gray-900" />
    </Link>
)}


      {/* Calculator (Shows After Splash) */}
      {!showSplash && (
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-4 text-white">Samsung Calculator</h1>
          <div className="bg-gray-800 p-4 rounded-lg w-72 text-right">
            <input
              className="w-full bg-gray-700 text-white p-2 text-xl rounded"
              type="text"
              value={result || input}
              readOnly
            />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
                <button
                  key={btn}
                  className="p-4 bg-blue-500 rounded text-white text-xl"
                  onClick={() =>
                    btn === "=" ? calculateResult() : handleClick(btn)
                  }
                >
                  {btn}
                </button>
              ))}
              <button
                className="col-span-2 p-4 bg-red-500 rounded text-white text-xl"
                onClick={clearInput}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
