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

  if (loading)
    return (
      <ContainerBoxed>
        <div className="py-10 text-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      </ContainerBoxed>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <ContainerBoxed>
      <div className="py-10">
        <h1 className="text-2xl font-semibold text-center mb-10">
          Edit QR Codes
        </h1>
        <p className="mb-2">
          You can change the QR code URL without changing the QR code.
        </p>
        <form onSubmit={handleSubmit} className="grid">
          <input
            type="url"
            name="url"
            id="destinationUrl"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            className={`bg-transparent border select:bg-black border-zinc-600 rounded-lg p-2 px-3 focus:outline focus:outline-4 focus:outline-indigo-500 ${
              error && " border-red-500 outline outline-2 outline-red-500"
            }`}
            placeholder="Enter your updated URL"
          />
          <button className="btn btn-primary mt-4" type="submit">
            Update URL
          </button>
        </form>
      </div>
    </ContainerBoxed>
  );
}
