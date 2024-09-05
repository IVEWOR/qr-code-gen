import mongoose from "mongoose";

const { Schema } = mongoose;

const recordsSchema = new Schema(
    {
        redirect_url: {
            type: String,
            required: true,
            unique: true,
        },
        destination_url: {
            type: String,
            required: true,
        },
        qr_img: {
            type: String,
            required: false,
        },
        // Reference to the User who created the record
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Records ||
    mongoose.model("Records", recordsSchema);