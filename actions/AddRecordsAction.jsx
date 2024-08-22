"use server";
import connectDB from "@/db/db.connect";
import Records from "@/models/records";

async function AddRecordsAction(formData) {
    const rawFormData = {
        destination_url: formData.get("url").toString(),
        redirect_url: formData.get("qr").toString()
    };
    await connectDB();
    const createRecord = new Records({
        destination_url: rawFormData.destination_url,
        redirect_url: rawFormData.redirect_url
    });
    await createRecord.save();
    console.log("saved...")
}

export default AddRecordsAction;