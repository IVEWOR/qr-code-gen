"use client";
import { useRef } from "react";
import QRCode from "react-qr-code";

import handleDownloadPNG from "@/utils/handleDownloadPNG";
import handleDownloadSVG from "@/utils/handleDownloadSVG";

export default function QRBox({ record }) {

    // Ref for downloading the QR Code
    const qrCodeRef = useRef(null);
    return (
        <div className="grid md:grid-cols-2 gap-4 mt-10">
            <div ref={qrCodeRef}>
                <QRCode value={record.redirect_url} level="M" style={{ margin: "0 auto", height: "100%", maxWidth: "100%", width: "100%" }} />
            </div>
            <div className="">
                <p className="mb-4 mt-2">This QR code is for: <br /> <code className="text-sm text-indigo-500">{record.destination_url}</code> <br /><br /> You can download the QR by clicking on the buttons below. Two options save it in PNG or SVG:</p>
                <button onClick={() => handleDownloadPNG(qrCodeRef)} className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 focus:outline focus:outline-4 focus:outline-emerald-400 w-full">Download PNG</button>
                <button onClick={() => handleDownloadSVG(qrCodeRef)} className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 focus:outline focus:outline-4 focus:outline-emerald-400 w-full mt-4">Download SVG</button>
            </div>
        </div>
    )
}