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
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Records ||
    mongoose.model("Records", recordsSchema);