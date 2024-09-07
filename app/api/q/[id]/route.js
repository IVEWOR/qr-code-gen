// app/api/q/[id]/route.js
import { NextResponse } from "next/server";
import Records from "@/models/records";
import connectDB from "@/db/db.connect";

export async function POST(req, { params }) {
    const { id } = params;
    try {
        await connectDB();
        console.log("Connected to the database");

        const updatedRecord = await Records.findOneAndUpdate(
            { redirect_url: `http://localhost:3000/q/${id}` },
            { $push: { visitHistory: { timestamp: new Date() } } },
            { new: true }
        );

        if (!updatedRecord) {
            return NextResponse.json({ message: "Record not found" }, { status: 404 });
        }

        return NextResponse.json({ destination_url: updatedRecord.destination_url }, { status: 200 });
    } catch (error) {
        console.error("Error updating visit history:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
