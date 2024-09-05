"use server"
import connectDB from "@/db/db.connect";
import Records from "@/models/records";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function AddRecordsAction(formData) {
    // Get session
    const session = await getServerSession(authOptions);

    // Wait for the DB connection
    await connectDB();

    // Get the user
    const user = await User.findOne({ email: session.user.email }).exec();

    // If no user display please login
    if (!user) {
        console.log("You're not a user")
    }

    // Create DB entry
    const createRecord = new Records({
        destination_url: formData.get("url").toString(),
        redirect_url: formData.get("qr").toString(),
        createdBy: user._id
    });

    // Save to DB
    await createRecord.save();
    console.log("saved...")
}

export default AddRecordsAction;