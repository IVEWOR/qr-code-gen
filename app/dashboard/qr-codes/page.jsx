import ContainerBoxed from "@/components/ContainerBoxed";
import { QRCODES } from "@/utils/siteUrls";

const fetchRecords = async () => {
    const response = await fetch("http://localhost:3000/api/qr-codes");
    if (!response.ok) {
        throw new Error("Failed to fetch the entries");
    }

    return response.json();
}

export default async function QRCodes() {
    const records = await fetchRecords();
    return (
        <ContainerBoxed>
            <div className="py-10">
                <h1 className="text-2xl font-semibold text-center mb-10">QR Codes</h1>
                <div className="grid gap-4">
                    {records && records.map((record) => (
                        <div className="border border-2 border-zinc-600 p-4 rounded-lg flex items-center gap-4 justify-between" key={record.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                            </svg>
                            <div className="text-zinc-300">{record.destination_url}</div>
                            <div className="flex gap-3">
                                <a href={`${QRCODES}/${record._id}`} className="bg-indigo-600 text-white text-sm p-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline focus:outline-4 focus:outline-indigo-400">View</a>
                                <a className="bg-zinc-600 text-white text-sm p-2 px-4 rounded-lg hover:bg-zinc-700 focus:outline focus:outline-4 focus:outline-zinc-400">Edit</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ContainerBoxed>
    )
}