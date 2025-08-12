import type { DecodedToken, IUser } from "../types";

import { Router, type Request, type Response } from "express";
import generateToken from "../utils/util";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load Environment Variables
dotenv.config();

const router: Router = Router();

// ---------------- ROOT ROUTE ----------------
router.get("/", (_: Request, res: Response): Response => {
  return res.status(200).json({ message: "Server Is Working!" });
});

// ---------------- AUTH CHECK ----------------
router.post("/auth", async (req: Request, res: Response) => {
  try {
    // Get Authorization Header
    const authHeader: string | undefined = req.header("Authorization");

    // Validate Header Format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No Authentication Token. Access Denied" });
    }

    // Extract Token
    const token: string = authHeader.split(" ")[1] as string;

    // Verify And Decode Token
    const decoded: DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    // Ensure Token Contains User ID
    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid Token Payload" });
    }

    // Find User Without Password
    const user: IUser | null = await User.findById(decoded.userId).select(
      "-password"
    );

    // Check If User Exists
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({
      message: "Authenticated",
      user,
    });
  } catch (error: unknown) {
    console.error(
      "Authentication Check Error:",
      error instanceof Error ? error.message : String(error)
    );

    return res.status(401).json({ message: "Token Is Not Valid" });
  }
});

// ---------------- REGISTER ----------------
router.post(
  "/register",
  async (
    req: Request<
      unknown,
      unknown,
      { name: string; email: string; password: string }
    >,
    res: Response
  ): Promise<Response> => {
    try {
      const { name, email, password } = req.body;

      // Validate Required Fields
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All Fields Are Required" });
      }

      // Check If User Already Exists
      const existingUser: IUser | null = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: "User Already Exists" });
      }

      // Hash Password And Create User
      const hashedPassword: string = await bcrypt.hash(password, 10);

      const user: IUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      // Return Created User With Token
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } catch (error: unknown) {
      console.error("Register Route Error:", error);

      return res.status(500).json({ message: "Server Error" });
    }
  }
);

// ---------------- LOGIN ----------------
router.post(
  "/login",
  async (
    req: Request<unknown, unknown, { email: string; password: string }>,
    res: Response
  ): Promise<Response> => {
    try {
      const { email, password } = req.body;

      // Validate Required Fields
      if (!email || !password) {
        return res.status(400).json({ message: "All Fields Are Required" });
      }

      // Find User By Email
      const user: IUser | null = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      // Compare Passwords
      const isMatch: boolean = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      // Return User Data With Token
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } catch (error: unknown) {
      console.error("Login Route Error:", error);

      return res.status(500).json({ message: "Server Error" });
    }
  }
);

export default router;
