"use client";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import QRCode from "react-qr-code";
import AddRecordsAction from "@/actions/AddRecordsAction";
import ContainerBoxed from "@/components/ContainerBoxed";
import handleDownloadPNG from "@/utils/handleDownloadPNG";
import handleDownloadSVG from "@/utils/handleDownloadSVG";

import { useSession } from "next-auth/react";

export default function Create() {
    const [qr, setQr] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [tempValue, setTempValue] = useState("");
    const [error, setError] = useState(false);

    const { data: session, status } = useSession();

    // Ref for downloading the QR Code
    const qrCodeRef = useRef(null);

    const handleInputChange = (e) => {
        setTempValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        const nano_id = nanoid(10);
        // Prevent default form submission
        e.preventDefault();
        try {
            // Check it's a url otherwise fail
            new URL(tempValue);
            setError(false);

            // Generate a internal URL for QR code
            const generatedQr = `http://localhost:3000/q/${nanoid(10)}`;
            setQr(generatedQr);

            // Set the temp value to the input value
            setInputValue(tempValue);

            // Create a FormData object and append the QR code
            const formData = new FormData(e.target);
            formData.set("qr", generatedQr);

            // Call the action function to save the data
            await AddRecordsAction(formData);

            // Clear the inputs after the action has been called
            setTempValue("");
        } catch (err) {
            setError(true);
        }
    };

    if (status === "unauthenticated") {
        return <div>Please login</div>
    }

    return (
        <ContainerBoxed>
            <div className="py-10 ">
                <h1 className="text-2xl font-semibold text-center mb-10">
                    Dynamic QR Code Generator
                </h1>
                <form onSubmit={handleSubmit} className="grid">
                    <input
                        type="url"
                        name="url"
                        className={`bg-transparent border select:bg-black border-zinc-600 rounded-lg p-2 px-3 focus:outline focus:outline-4 focus:outline-indigo-500 ${error && " border-red-500 outline outline-2 outline-red-500"
                            }`}
                        value={tempValue}
                        onChange={handleInputChange}
                        placeholder="Enter your URL"
                    />
                    <button className="btn btn-primary mt-4" type="submit">
                        Generate QR
                    </button>
                </form>
                <>
                    {qr && !error && (
                        <div className="grid md:grid-cols-2 gap-4 mt-10">
                            <div ref={qrCodeRef}>
                                <QRCode
                                    value={qr}
                                    level="M"
                                    style={{
                                        margin: "0 auto",
                                        height: "100%",
                                        maxWidth: "100%",
                                        width: "100%",
                                    }}
                                />
                            </div>
                            <div className="">
                                <p className="mb-4 mt-2">
                                    You can download the QR by clicking on the buttons below. Two
                                    options save it in PNG or SVG:
                                </p>
                                <button
                                    onClick={() => handleDownloadPNG(qrCodeRef)}
                                    className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 focus:outline focus:outline-4 focus:outline-emerald-400 w-full"
                                >
                                    Download PNG
                                </button>
                                <button
                                    onClick={() => handleDownloadSVG(qrCodeRef)}
                                    className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 focus:outline focus:outline-4 focus:outline-emerald-400 w-full mt-4"
                                >
                                    Download SVG
                                </button>
                            </div>
                        </div>
                    )}
                </>
            </div>
        </ContainerBoxed>
    );
}
