"use client";
import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { nanoid } from 'nanoid';
import * as htmlToImage from "html-to-image";

export default function Static() {
  const [inputValue, setInputValue] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [error, setError] = useState(false);
  const qrCodeRef = useRef(null);

  const handleInputChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      new URL(tempValue);
      setError(false);
      setInputValue(tempValue);
    } catch (err) {
      setError(true);
    }
  };

  const handleDownloadPNG = () => {
    if (qrCodeRef.current) {
      htmlToImage
        .toPng(qrCodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qr-code.png";
          link.click();
        })
        .catch((error) => {
          console.error("Error generating PNG QR code:", error);
        });
    } else {
      console.error("PNG QR Code element is not available for download.");
    }
  }

  const handleDownloadSVG = () => {
    if (qrCodeRef.current) {
      htmlToImage
        .toSvg(qrCodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qr-code.svg";
          link.click();
        })
        .catch((error) => {
          console.error("Error generating PNG QR code:", error);
        });
    } else {
      console.error("PNG QR Code element is not available for download.");
    }
  }

  return (
    <div className="">
      <h1>Generate Static QR Code</h1>
      <div className="max-w-[600px] mx-auto py-20">
        <div className="grid">
          <input
            type="url"
            name="url"
            id="url"
            className={`bg-transparent border select:bg-black border-zinc-600 rounded-lg p-2 focus:outline focus:outline-4 focus:outline-indigo-500 ${error && " border-red-500 outline outline-2 outline-red-500"}`}
            value={tempValue}
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
        </div>
        <div className="mt-10">
          {!error && inputValue != "" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div ref={qrCodeRef}>
                <QRCode value={inputValue} style={{ margin: "0 auto", height: "300px", maxWidth: "100%", width: "100%" }} />
              </div>
              <div className="">
                <p className="mb-4 mt-2">You can download the QR by clicking on the buttons below:</p>
                <button onClick={handleDownloadPNG} className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 focus:outline focus:outline-4 focus:outline-emerald-400 w-full">Download PNG</button>
                <button onClick={handleDownloadSVG} className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 focus:outline focus:outline-4 focus:outline-emerald-400 w-full mt-4">Download SVG</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
