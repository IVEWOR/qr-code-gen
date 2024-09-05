import { NextResponse } from "next/server";
import connectDB from "@/db/db.connect";
import Records from "@/models/records";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req) => {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user || !session.user.userId) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Connect to the database
    await connectDB();

    const records = await Records.find({ createdBy: session.user.userId }).lean();

    return new NextResponse(JSON.stringify(records), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
