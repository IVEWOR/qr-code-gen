import ContainerBoxed from "@/components/ContainerBoxed";
import QRBox from "@/components/QRBox";
import { notFound } from "next/navigation";

export default async function QRCodeSingle({ params }) {
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
            </div>
        </ContainerBoxed>
    )
}