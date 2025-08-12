import type { IUser } from "../types";

import mongoose, { Model, Schema } from "mongoose";

// Define User Schema
const UserSchema: Schema<IUser> = new Schema({
  // User Name (Required)
  name: {
    type: String,
    required: true,
  },
  // User Email (Required & Unique)
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // User Password (Required)
  password: {
    type: String,
    required: true,
  },
});

// Create Or Reuse User Model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
