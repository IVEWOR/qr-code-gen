"use server"
import connectDB from "@/db/db.connect";
import Records from "@/models/records";
import User from "@/models/user";
import { getServerSession } from "next-auth";

async function AddRecordsAction(formData) {
    // Get session
    const session = await getServerSession(authOptions);

    // Wait for the DB connection
    await connectDB();

    const user = await User.findOne({ email: session.user.email }).exec();

    // If no user display please login
    if (!user) {
        console.log("You're not a user")
    }

    const createRecord = new Records({
        destination_url: formData.get("url").toString(),
        redirect_url: formData.get("qr").toString(),
        createdBy: user._id
    });
    await createRecord.save();
    console.log("saved...")
}

export default AddRecordsAction;