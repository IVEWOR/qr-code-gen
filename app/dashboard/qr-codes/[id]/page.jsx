
import ContainerBoxed from "@/components/ContainerBoxed";
import QRBox from "@/components/QRBox";
import { notFound } from "next/navigation";
import { QRCODES } from "@/utils/siteUrls";
import DelQR from "@/components/DelQR";

export default async function QRCodeSingle({ params }) {

    // Fetch the single QR
    const response = await fetch(`http://localhost:3000/api/qr-codes/${params.id}`);

    if (response.status === 404) {
        return notFound();
    }
    const record = await response.json();

    return (
        <ContainerBoxed>
            <div className="py-10">
                <h1 className="text-2xl font-semibold text-center mb-10">QR Code Single</h1>
                <QRBox record={record} />
                <div className="flex gap-4">
                    <a href={`${QRCODES}/edit/${params.id}`} className="text-center bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline focus:outline-4 focus:outline-indigo-400 w-full mt-4">Edit QR</a>
                    <DelQR id={params.id} />
                </div>
            </div>
        </ContainerBoxed>
    )
}