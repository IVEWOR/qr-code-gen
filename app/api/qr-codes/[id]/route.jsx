import { NextResponse } from "next/server";
import connectDB from "@/db/db.connect";
import Records from "@/models/records";

export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const { id } = params;

        // Fetch record using findById and use .lean() to convert it to a plain object
        const record = await Records.findById(id).lean();

        if (!record) {
            return new NextResponse("Record not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(record), { status: 200 });
    } catch (error) {
        console.error("Error fetching record:", error);
        return new NextResponse(`Error fetching the record: ${error.message}`, { status: 500 });
    }
}
