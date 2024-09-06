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
                                <div className="grid gap-2">
                                    <button
                                        onClick={() => handleDownloadPNG(qrCodeRef)}
                                        className="btn btn-success rounded-box w-full"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                        Download PNG
                                    </button>
                                    <button
                                        onClick={() => handleDownloadSVG(qrCodeRef)}
                                        className="btn btn-success rounded-box w-full"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                        </svg>
                                        Download SVG
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            </div>
        </ContainerBoxed>
    );
}
