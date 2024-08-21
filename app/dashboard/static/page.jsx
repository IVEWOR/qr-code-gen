"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import { nanoid } from 'nanoid'

export default function Static() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      new URL(inputValue);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  console.log(nanoid(10))
  return (
    <div className="">
      <h1>Generate Static QR Code</h1>
      <div className="max-w-[600px] mx-auto py-20">
        <form action="" className="grid">
          <input
            type="url"
            name="url"
            id="url"
            className={`bg-transparent border select:bg-black border-zinc-600 rounded-lg p-2 focus:outline focus:outline-4 focus:outline-indigo-500 ${error && " border-red-500 outline outline-2 outline-red-500"}`}
            value={inputValue}
            onChange={handleInputChange}
          />
          {error &&
            <p className="text-sm text-red-500 mt-1">Please enter a valid URL (with http:// or https://)</p>
          }
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline focus:outline-4 focus:outline-indigo-400 mt-4"
          >
            Generate QR
          </button>
        </form>
        <div>
          {!error && inputValue != "" && (
            <QRCode value={inputValue} />
          )}
        </div>
      </div>
    </div>
  );
}
