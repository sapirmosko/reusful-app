import { Schema, model } from "mongoose";

export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userImage: string;
  country: string;
  city: string;
  streetAddress: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<UserInterface>({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  username: String,
  userImage: String,
  country: String,
  city: String,
  streetAddress: String,
});

export const User = model<UserInterface>("user", userSchema);
