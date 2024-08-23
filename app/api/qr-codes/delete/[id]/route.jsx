import { NextResponse } from "next/server";
import connectDB from "@/db/db.connect";
import Records from "@/models/records";

export const DELETE = async (request, { params }) => {
    try {
        await connectDB();
        const { id } = params;
        // Find and delete the record
        await Records.findByIdAndDelete(id);
        return new NextResponse("Record deleted", { status: 200 });
    } catch (error) {
        console.error("Error deleting record:", error);
        return new NextResponse(`Error deleting the record: ${error}`, { status: 500 });
    }
}