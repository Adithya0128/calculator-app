"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function XiaomiCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult(null);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input).toString()); // ⚠️ Use eval with caution
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <motion.h1
        className="text-4xl font-bold mb-6 text-orange-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Xiaomi Calculator
      </motion.h1>

      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[400px] h-[500px] text-right">
        <div className="bg-gray-700 p-3 rounded text-3xl min-h-[70px]">
          {result || input || "0"}
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3">
          {["C", "+/-", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="].map((btn) => (
            <motion.button
              key={btn}
              className={`p-4 rounded-lg text-xl font-bold transition ${
                btn === "C" ? "bg-red-500 hover:bg-red-600" :
                btn === "=" ? "bg-orange-500 hover:bg-orange-600" :
                ["÷", "×", "-", "+"].includes(btn) ? "bg-blue-500 hover:bg-blue-600" :
                "bg-gray-600 hover:bg-gray-700"
              }`}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                btn === "=" ? calculateResult() :
                btn === "C" ? clearInput() :
                handleClick(btn.replace("×", "*").replace("÷", "/"))
              }
            >
              {btn}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
