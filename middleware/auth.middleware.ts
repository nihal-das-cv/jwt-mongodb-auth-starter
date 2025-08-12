import type { AuthenticatedRequest, DecodedToken, IUser } from "../types";
import type { Response, NextFunction } from "express";

import User from "../models/User";
import jwt from "jsonwebtoken";

// Middleware To Protect Routes By Verifying JWT
const protectRoute: (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<Response | void> = async (req, res, next) => {
  try {
    // Get Authorization Header
    const authHeader: string | undefined = req.header("Authorization");

    // Check If Authorization Header Exists And Starts With "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No Authentication Token. Access Denied" });
    }

    // Extract Token From Header
    const token: string = authHeader.split(" ")[1] as string;

    // Verify Token And Decode Payload
    const decoded: DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    // Ensure Payload Contains User ID
    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid Token Payload" });
    }

    // Find User And Exclude Password Field
    const user: IUser | null = await User.findById(decoded.userId).select(
      "-password"
    );

    // Check If User Exists
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    // Attach User To Request Object
    req.user = user;

    // Continue To Next Middleware Or Route Handler
    next();
  } catch (error: unknown) {
    // Log Authentication Error
    console.error(
      "Authentication Error:",
      error instanceof Error ? error.message : String(error)
    );

    // Send Unauthorized Response
    return res.status(401).json({ message: "Token Is Not Valid" });
  }
};

export default protectRoute;
