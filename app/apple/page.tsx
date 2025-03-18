"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AppleCalculator() {
  const [showSplash, setShowSplash] = useState(true);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

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
    setResult("");
  };

  const calculateResult = () => {
    try {
      const formattedInput = input.replace(/×/g, "*").replace(/÷/g, "/");
      setResult(eval(formattedInput).toString());
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      {/* Splash Screen Animation */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 5, ease: "easeOut" }}
            exit={{ opacity: 0 }}
          >
            <Image 
              src="/apple-logo.png" 
              alt="Apple Logo" 
              width={500} 
              height={500} 
              className="max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calculator - Only show after splash */}
      {!showSplash && (
        <div className="bg-gray-900 p-6 rounded-3xl shadow-lg w-80">
          {/* Display Screen */}
          <div className="text-right text-white text-4xl font-light p-4 mb-4 bg-gray-800 rounded-lg min-h-[80px]">
            {result || input || "0"}
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-2">
            <button className="btn gray" onClick={clearInput}>AC</button>
            <button className="btn gray">+/-</button>
            <button className="btn gray">%</button>
            <button className="btn orange" onClick={() => handleClick("÷")}>÷</button>

            {[7, 8, 9, "×", 4, 5, 6, "-", 1, 2, 3, "+"].map((val, i) => (
              <button 
                key={i} 
                className={`btn ${typeof val === "string" ? "orange" : "dark"}`} 
                onClick={() => handleClick(val.toString())}
              >
                {val}
              </button>
            ))}

            <button className="btn dark col-span-2" onClick={() => handleClick("0")}>0</button>
            <button className="btn dark" onClick={() => handleClick(".")}>.</button>
            <button className="btn orange" onClick={calculateResult}>=</button>
          </div>
        </div>
      )}

      {/* Tailwind Styles */}
      <style jsx>{`
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          padding: 15px;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .btn.dark { background: #333; color: white; }
        .btn.orange { background: #ff9f0a; color: white; }
        .btn.gray { background: #a5a5a5; color: black; }
        .btn:hover { opacity: 0.8; transform: scale(1.05); }
        .col-span-2 { grid-column: span 2; border-radius: 40px; }
      `}</style>
    </div>
  );
}
