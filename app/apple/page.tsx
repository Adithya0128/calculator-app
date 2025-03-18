"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const calculateResult = () => {
    try {
      // Fix: Convert × and ÷ to * and / before evaluation
      const formattedInput = input.replace(/×/g, "*").replace(/÷/g, "/");
      setResult(eval(formattedInput).toString()); 
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-6 rounded-3xl shadow-lg w-80">
        {/* Display Screen */}
        <div className="text-right text-white text-4xl font-light p-4 mb-4 bg-gray-800 rounded-lg min-h-[80px]">
          {result || input || "0"}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Top Row */}
          <button className="btn gray" onClick={clearInput}>AC</button>
          <button className="btn gray">+/-</button>
          <button className="btn gray">%</button>
          <button className="btn orange" onClick={() => handleClick("÷")}>÷</button>

          {/* Numbers & Operators */}
          {[7, 8, 9, "×", 4, 5, 6, "-", 1, 2, 3, "+"].map((val, i) => (
            <button 
              key={i} 
              className={`btn ${typeof val === "string" ? "orange" : "dark"}`} 
              onClick={() => handleClick(val.toString())}
            >
              {val}
            </button>
          ))}

          {/* Bottom Row */}
          <button className="btn dark col-span-2" onClick={() => handleClick("0")}>0</button>
          <button className="btn dark" onClick={() => handleClick(".")}>.</button>
          <button className="btn orange" onClick={calculateResult}>=</button>
        </div>
      </div>

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
