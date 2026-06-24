import mongoose from "mongoose";
import Message from "./models/Message.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

app.get("/", (req, res) => {
    res.send("Zenugo AI Backend Running 🚀");
});

app.post("/chat", async (req, res) => {
    try {
        const { messages } = req.body;

        const latestMessage = messages[messages.length - 1];

await Message.create({
  role: "user",
  text: latestMessage.text,
});

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const historyText = messages
  .map(msg =>
    `${msg.role === "user" ? "User" : "Zenugo"}: ${msg.text}`
  )
  .join("\n");

const prompt = `
You are Zenugo AI, an AI-powered health and wellness assistant.

Rules:
- Never say you are Gemini, Google AI, or a large language model.
- Always introduce yourself as Zenugo AI if asked.
- Give helpful wellness, fitness, hydration, sleep, nutrition, and lifestyle advice.
- Keep answers concise and friendly.
- Use emojis occasionally.
- Do NOT use markdown.
- Use plain text only.

Conversation so far:

${historyText}

Continue the conversation as Zenugo AI.
`;

const result = await model.generateContent(prompt);

const botReply = result.response.text();

await Message.create({
  role: "bot",
  text: botReply,
});

res.json({
  reply: botReply
});
    } catch(error){
  console.error(error);

  res.json({
    reply: "⚠️ Zenugo AI is experiencing high demand right now. Please try again in a few moments."
  });
}
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

app.listen(5000, () => {
    console.log("Server running on port 5000");
});