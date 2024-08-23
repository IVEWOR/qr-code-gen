"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContainerBoxed from "@/components/ContainerBoxed";

export default function EditQRCode({ params }) {
    const [destinationUrl, setDestinationUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch the existing data for the QR code
        async function fetchData() {
            try {
                const response = await fetch(`/api/qr-codes/${params.id}`);
                if (!response.ok) throw new Error("Failed to fetch the QR code data");
                const data = await response.json();
                setDestinationUrl(data.destination_url);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/qr-codes/edit/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ destination_url: destinationUrl }),
            });

            if (!response.ok) {
                throw new Error("Failed to update the QR code");
            }

            // Redirect to the list or details page after successful update
            router.push(`/dashboard/qr-codes/${params.id}`);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ContainerBoxed>
            <div className="py-10">
                <h1 className="text-2xl font-semibold text-center mb-10">Edit QR Codes</h1>
                <form onSubmit={handleSubmit} className="grid">
                    <input
                        type="url"
                        name="url"
                        id="destinationUrl"
                        value={destinationUrl}
                        onChange={(e) => setDestinationUrl(e.target.value)}
                        className={`bg-transparent border select:bg-black border-zinc-600 rounded-lg p-2 px-3 focus:outline focus:outline-4 focus:outline-indigo-500 ${error && " border-red-500 outline outline-2 outline-red-500"}`}
                        placeholder="Enter your updated URL"
                    />
                    <button
                        className="bg-indigo-600 text-white p-2 py-3 rounded-lg hover:bg-indigo-700 focus:outline focus:outline-4 focus:outline-indigo-400 mt-4"
                        type="submit"
                    >
                        Generate QR
                    </button>
                </form>
            </div>
        </ContainerBoxed>
    );
}
