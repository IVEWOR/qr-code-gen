"use client"
import { useRouter } from "next/navigation";

// Delete QR
const handleDelete = async (id) => {

    const confirmDelete = confirm("Are you sure you want to delete this QR code?");
    if (!confirmDelete) return;

    try {
        const responseDel = await fetch(`/api/qr-codes/delete/${id}`, {
            method: "DELETE",
        });

        if (responseDel.ok) {
            alert("QR code deleted successfully.");

            // Redirect url after delete
            useRouter.push("/dashboard/qr-codes")
        } else {
            console.error("Failed to delete QR code");
            alert("Failed to delete QR code.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the QR code.");
    }
}

export default handleDelete;