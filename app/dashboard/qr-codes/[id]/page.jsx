"use client";
import ContainerBoxed from "@/components/ContainerBoxed";
import QRBox from "@/components/QRBox";
import { QRCODES } from "@/utils/siteUrls";
import DelQR from "@/components/DelQR";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function QRCode({ params }) {
  const { data: session, status } = useSession();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchRecord = async () => {
        try {
          const response = await fetch(`/api/qr-codes/${params.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch record');
          }
          const data = await response.json();
          setRecord(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRecord();
    }
  }, [status, params.id]);

  if (status === 'loading' || loading) {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to view your records.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ContainerBoxed>
      <div className="py-10">
        <h1 className="text-2xl font-semibold text-center mb-10">
          QR Code Single
        </h1>
        <QRBox record={record} />
        <div className="flex gap-4 mt-4">
          <Link
            className="btn btn-outline w-1/2"
            href={`${QRCODES}/edit/${params.id}`}
          >
            Edit QR
          </Link>
          <DelQR id={params.id} />
        </div>
      </div>
    </ContainerBoxed>
  );
}
