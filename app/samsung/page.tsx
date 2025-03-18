"use client";

import { useState } from "react";

export default function SamsungCalculator() {
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
      if (!input) return; // Prevent eval() from running on empty input

      // Fix: Replace ÷ with / and × with * before evaluating
      const formattedInput = input.replace(/÷/g, "/").replace(/×/g, "*");

      const calculatedResult = eval(formattedInput).toString(); // ⚠️ Be cautious with eval
      setResult(calculatedResult);
      setInput(calculatedResult); // Update input with result
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Samsung Calculator</h1>
      <div className="bg-gray-800 p-4 rounded-lg w-72 text-right">
        <input
          className="w-full bg-gray-700 text-white p-2 text-xl rounded"
          type="text"
          value={result || input} // Display result if available
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
  );
}
