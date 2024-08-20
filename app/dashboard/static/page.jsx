"use client";
import Image from "next/image";
import QRCode from "qrcode";
import { useState } from "react";

export default function Static() {
  const [qr, setQr] = useState("");
  const [inputValue, setInputValue] = useState("");

  const generateQR = async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
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
        <form action="" className="grid gap-6">
          <input
            type="url"
            name="url"
            id="url"
            className="bg-transparent border select:bg-black border-zinc-600 rounded-lg p-2 focus:outline focus:outline-4 focus:outline-indigo-500"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline-dotted focus:outline-2 focus:outline-indigo-300"
          >
            Generate QR
          </button>
        </form>
        <div>
          {qr != "" && (
            <Image src={qr} alt="your qr code" width="300" height="300" />
          )}
        </div>
      </div>
    </div>
  );
}
