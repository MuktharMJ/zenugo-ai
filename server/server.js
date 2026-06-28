import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Zenugo AI Backend Running 🚀");
});

connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});