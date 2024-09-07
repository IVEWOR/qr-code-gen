import { redirect } from "next/navigation";
import Records from "@/models/records";
import connectDB from "@/db/db.connect";

export default async function RedirectPage({ params }) {
    const { id } = params;

    // Call the API to update the record and get the destination URL
    const response = await fetch(`http://localhost:3000/api/q/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        if (response.status === 404) {
            return <h1>404 - Record not found</h1>;
        }
        return <h1>500 - Internal Server Error</h1>;
    }

    const data = await response.json();

    await connectDB();
    console.log("pasting from here client");

    await Records.findOneAndUpdate(
        { redirect_url: `http://localhost:3000/q/${id}` },
        { $push: { visitHistory: { timestamp: new Date() } } },
        { new: true }
    );

    // Perform the redirect to the destination URL
    redirect(data.destination_url);
}
