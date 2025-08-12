import type { Document, Types } from "mongoose";
import type { Request } from "express";

// User Interface For Mongoose Model
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  token: string;
}

// Extended Express Request With Authenticated User
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// Structure Of Decoded JWT Token
interface DecodedToken {
  userId: string;
  iat?: number; // Issued At
  exp?: number; // Expiration
}
