import express, { type Application } from "express";

import connectDB from "./lib/database";
import routes from "./routes/route";
import cors from "cors";

// Initialize Express Application
const app: Application = express();

// Server Port
const PORT: number = 5000;

// Middleware To Parse JSON Requests
app.use(express.json());

// Enable Cross-Origin Requests
app.use(cors());

// API Routes
app.use("/api", routes);

// Start Server And Connect To Database
app.listen(PORT, (): void => {
  connectDB();
  console.log(`Server Is Running On Port ${PORT}...`);
});
