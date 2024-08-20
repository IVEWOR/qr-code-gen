"use client";
import Image from "next/image";
import QRCode from "qrcode";
import { useState } from "react";

export default function Static() {
  const [qr, setQr] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const generateQR = async (url) => {
    try {
      new URL(url);
      setError(false);
      return await QRCode.toDataURL(url);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateQR(inputValue).then((qrCode) => {
      setQr(qrCode);
    });
  };
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
          {!error && (
            <Image src={qr} alt="your qr code" width="300" height="300" />
          )}
        </div>
      </div>
    </div>
  );
}
