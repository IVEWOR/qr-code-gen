"use client"
import ContainerBoxed from "@/components/ContainerBoxed";
import { QRCODES } from "@/utils/siteUrls";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Pricing from "@/components/Pricing";

const QRIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
    />
  </svg>
);

export default function QRCodes() {

  const { data: session, status } = useSession();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchRecords = async () => {
        try {
          const response = await fetch('/api/qr-codes');
          if (!response.ok) {
            throw new Error('Failed to fetch records');
          }
          const data = await response.json();
          setRecords(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchRecords();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return <Loading />
  }

  if (!session.user.hasAccess) {
    return (
      <>
        <div className="max-w-4xl mx-auto p-4 pt-10">
          <div className="text-2xl font-semibold">You don't have any subscription yet. Please choose an plan to continue.</div>
        </div>
        <Pricing />
      </>
    )
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ContainerBoxed>
      <div className="py-10">
        <h1 className="text-2xl font-semibold text-center mb-10">QR Codes</h1>
        <div className="grid gap-4">
          {records.map((record) => (
            <div className="shadow border p-4 rounded-box md:flex items-center gap-4 justify-between" key={record._id}>
              <div className="flex gap-2 mb-4 md:mb-0 items-center">
                <QRIcon />
                <div className="text-zinc-600">{record.destination_url}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`${QRCODES}/${record._id}`} className="btn btn-success rounded-box min-h-10 h-10">View</Link>
                <Link href={`${QRCODES}/edit/${record._id}`} className="btn btn-neutral rounded-box min-h-10 h-10">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerBoxed>
  );
}
