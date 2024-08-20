"use client";
import QRCode from "qrcode";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const generateQR = async (text) => {
      try {
        console.log(await QRCode.toDataURL(text));
      } catch (err) {
        console.error(err);
      }
    };
    generateQR("https://deepslog.com");
  }, []);

  return (
    <main>
      <h1>QR Code Gen</h1>
    </main>
  );
}
