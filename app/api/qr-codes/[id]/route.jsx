import { NextResponse } from "next/server";
import connectDB from "@/db/db.connect";
import Records from "@/models/records";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (request, { params }) => {
    try {
        // Get session
        const session = await getServerSession(authOptions);

        // Check if the user is authenticated
        if (!session || !session.user || !session.user.userId) {
            return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        // Connect DB
        await connectDB();
        const { id } = params;

        // Fetch record using findById and use .lean() to convert it to a plain object
        const record = await Records.findOne({ _id: id, createdBy: session.user.userId }).lean();

        if (!record) {
            return new NextResponse("Record not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(record), { status: 200 });
    } catch (error) {
        console.error("Error fetching record:", error);
        return new NextResponse(`Error fetching the record: ${error.message}`, { status: 500 });
    }
}
