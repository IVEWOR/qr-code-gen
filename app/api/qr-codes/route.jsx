import { NextResponse } from "next/server";
import connectDB from "@/db/db.connect";
import Records from "@/models/records";

export const GET = async (request) => {
    try {
        await connectDB();

        // Fetch records and use .lean() to convert documents to plain objects
        const records = await Records.find({}).lean();
        return new NextResponse(JSON.stringify(records), { status: 200 });
    } catch (error) {
        console.error("Error fetching records:", error);
        return new NextResponse(`Error fetching the records ${error}`, { status: 500 });
    }
}