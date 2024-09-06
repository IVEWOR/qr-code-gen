"use client";
import ContainerBoxed from "@/components/ContainerBoxed";
import { QRCODES } from "@/utils/siteUrls";
import DelQR from "@/components/DelQR";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { QRCodeSVG } from 'qrcode.react';

import handleDownloadPNG from "@/utils/handleDownloadPNG";
import handleDownloadSVG from "@/utils/handleDownloadSVG";

export default function QRCodeSingle({ params }) {
  const qrCodeRef = useRef(null);
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
        <h1 className="text-3xl font-semibold text-center mb-10">
          QR Code
        </h1>
        <div className="grid md:grid-cols-2 gap-4 mt-10 md:px-2">
          <div className="inline-flex align-center justify-center" ref={qrCodeRef}>
            <QRCodeSVG value={record.redirect_url} size="350" level="Q" />
          </div>
          <div className="">
            <p className="mb-4 mt-2 px-2">
              This QR code is for: <br />{" "}
              <code className="text-sm text-indigo-500">
                {record.destination_url}
              </code>{" "}
              <br />
              <br /> You can download the QR by clicking on the buttons below. Two
              options save it in PNG or SVG:
            </p>
            <div className="grid gap-2 px-2">
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
        <div className="grid grid-cols-2 gap-4 mt-4 px-2">
          <Link
            className="btn btn-outline rounded-box w-full"
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
