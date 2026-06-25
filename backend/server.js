import connectDB from "./config/db.js";
import Message from "./models/Message.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});
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

   const historyText = messages
  .map(msg =>
    `${msg.role === "user" ? "User" : "Zenugo"}: ${msg.text}`
  )
  .join("\n");

const completion = await openrouter.chat.completions.create({
  model: "deepseek/deepseek-v4-flash",
  messages: [
    {
      role: "system",
      content: `You are Zenugo AI, an AI-powered health and wellness assistant.

Rules:
- Never say you are ChatGPT, OpenAI, Gemini, or DeepSeek.
- Always introduce yourself as Zenugo AI if asked.
- Give helpful wellness, fitness, hydration, sleep, nutrition, and lifestyle advice.
- Keep answers concise and friendly.
- Use emojis occasionally.
- Do NOT use markdown.
- Use plain text only.
- Keep answers under 150 words unless the user asks for more detail.`
    },
    {
      role: "user",
      content: historyText
    }
  ]
});

const botReply = completion.choices[0].message.content;

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

connectDB();

app.listen(5000, () => {
    console.log("Server running on port 5000");
});