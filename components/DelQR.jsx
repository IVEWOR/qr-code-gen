"use client";
import { useRouter } from "next/navigation";
export default function DelQR({ id }) {
  const router = useRouter();
  // Delete QR
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this QR code?"
    );
    if (!confirmDelete) return;

    try {
      const responseDel = await fetch(`/api/qr-codes/delete/${id}`, {
        method: "DELETE",
      });

      if (responseDel.ok) {
        alert("QR code deleted successfully.");
        router.push("/dashboard/qr-codes");
      } else {
        console.error("Failed to delete QR code");
        alert("Failed to delete QR code.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the QR code.");
    }
  };
  return (
    <button onClick={handleDelete} className="btn btn-error btn-outline rounded-box w-full">
      Delete QR
    </button>
  );
}
