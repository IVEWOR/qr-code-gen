import Records from "@/models/records";
import connectDB from "@/db/db.connect";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
    const { redirectUrl } = params;
    try {
        await connectDB();
        const updatedRecord = await Records.findOneAndUpdate(
            {
                redirect_url: `http://localhost:3000/q/${params.id}`
            },
            {
                $push: { visitHistory: { timestamp: new Date() } },
            },
            { new: true }
        );

        if (!updatedRecord) {
            return redirect('/404');;
        }

        // Redirect to the destination_url
        redirect(updatedRecord.destination_url);
    } catch (error) {
        console.error('Error updating visit history:', error);
        return redirect("/500")
    }

}