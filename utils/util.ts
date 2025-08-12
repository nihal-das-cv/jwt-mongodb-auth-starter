import jwt from "jsonwebtoken";

// Generate JWT Token For A Given User ID
const generateToken: (userId: string) => string = (userId) => {
  // Get JWT Secret From Environment Variables
  const secret: string | undefined = process.env.JWT_SECRET;

  // Throw Error If Secret Is Missing
  if (!secret) {
    throw new Error("JWT_SECRET Is Not Defined");
  }

  // Sign And Return Token (Expires In 15 Days)
  return jwt.sign({ userId }, secret, {
    expiresIn: "15d",
  });
};

export default generateToken;
