import { NextResponse } from "next/server";
import connectDB from "@/db/db.connect";
import Records from "@/models/records";

export const PUT = async (request, { params }) => {
    try {
        await connectDB();
        const { id } = params;

        // Parse the request body to get the updated data
        const { destination_url } = await request.json();

        // Update the record by its ID with only the destination_url field
        const updatedRecord = await Records.findByIdAndUpdate(
            id,
            { destination_url },
            { new: true, runValidators: true }
        );

        if (!updatedRecord) {
            return NextResponse.json({ message: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(updatedRecord, { status: 200 });
    } catch (error) {
        console.error("Error updating record:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
