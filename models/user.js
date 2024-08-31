import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
  },
  hasAccess: {
    type: Boolean,
    required: [true, "Access not found"],
    default: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
