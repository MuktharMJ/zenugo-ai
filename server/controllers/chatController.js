import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const SYSTEM_PROMPT = `You are Zenugo AI, an AI-powered health and wellness assistant.

Rules:
- Never say you are ChatGPT, OpenAI, Gemini, or DeepSeek.
- Always introduce yourself as Zenugo AI if asked.
- You were created and developed by Mukthar M J.
- If someone asks who created or developed you, clearly state that you were created by Mukthar M J.
- If someone asks about Mukthar M J, only state that he is your creator and developer unless the user provides additional information. Never invent personal details.
- If someone asks what you are built with, explain that you are a custom-built MERN stack web application with AI capabilities powered through the OpenRouter API.
- Your purpose is to help people improve their health, wellness, fitness, sleep, nutrition, hydration, and daily habits through friendly, practical conversations.
- Be supportive, encouraging, and evidence-informed, but never claim to be a doctor or medical professional.
- Encourage users with medical concerns to consult qualified healthcare professionals when appropriate.
- Give helpful wellness, fitness, hydration, sleep, nutrition, and lifestyle advice.
- Keep answers concise and friendly.
- Use emojis occasionally.
- Do NOT use markdown.
- Use plain text only.
- Keep answers under 150 words unless the user asks for more detail.`;

// GET /chat — list all conversations for the current user
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ user: req.user.userId })
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// POST /chat/new — create a new conversation
export const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      user: req.user.userId,
      title: "New Chat",
    });

    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET /chat/:id — get a conversation with its messages
export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).lean();

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const messages = await Message.find({ conversation: conversation._id })
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json({ ...conversation, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// POST /chat/:id/message — send a message and get AI reply
export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Message text is required" });
    }

    // Verify the conversation belongs to this user
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Save the user message
    const userMessage = await Message.create({
      conversation: conversation._id,
      role: "user",
      text: text.trim(),
    });

    // Get conversation history for AI context
    const history = await Message.find({ conversation: conversation._id })
      .sort({ createdAt: 1 })
      .lean();

    const historyText = history
      .map((msg) => `${msg.role === "user" ? "User" : "Zenugo"}: ${msg.text}`)
      .join("\n");

    // Prepare promises for concurrent execution
    let titlePromise = null;

    const messageCount = await Message.countDocuments({
      conversation: conversation._id,
      role: "user",
    });

    if (messageCount === 1) {
      const titlePrompt = `Generate a highly concise title (3-5 words, max 35 characters, Title Case) summarizing this user's first message. Do NOT use quotes, do not say "Title:" and never use generic terms like "hi", "hello" or "ok". If it's just a greeting, return "New Conversation". User message: "${text.trim()}"`;
      titlePromise = openrouter.chat.completions.create({
        model: "deepseek/deepseek-v4-flash",
        messages: [{ role: "user", content: titlePrompt }],
        max_tokens: 15,
      });
    }

    const chatPromise = openrouter.chat.completions.create({
      model: "deepseek/deepseek-v4-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: historyText },
      ],
    });

    // Execute concurrently
    const [titleCompletion, chatCompletion] = await Promise.all([
      titlePromise,
      chatPromise,
    ]);

    if (messageCount === 1) {
      let autoTitle = text.trim().split(" ").slice(0, 4).join(" ");
      if (autoTitle.length > 35) autoTitle = autoTitle.substring(0, 32) + "...";

      try {
        if (titleCompletion && titleCompletion.choices && titleCompletion.choices.length > 0) {
          const generatedTitle = titleCompletion.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
          if (generatedTitle && generatedTitle.length <= 35) {
            autoTitle = generatedTitle;
          } else if (generatedTitle && generatedTitle.length > 35) {
            autoTitle = generatedTitle.substring(0, 32) + "...";
          }
        }
      } catch (err) {
        console.error("Failed to parse title:", err);
      }
      conversation.title = autoTitle;
      await conversation.save();
    }

    const botReply = chatCompletion.choices[0].message.content;

    // Save bot reply
    const botMessage = await Message.create({
      conversation: conversation._id,
      role: "bot",
      text: botReply,
    });

    // Touch updatedAt on the conversation
    conversation.updatedAt = new Date();
    await conversation.save();

    res.status(200).json({
      userMessage,
      botMessage,
      title: conversation.title,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "AI Error",
      fallbackReply:
        "⚠️ Zenugo AI is experiencing high demand right now. Please try again in a few moments.",
    });
  }
};

// DELETE /chat/:id — delete a conversation and its messages
export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    await Message.deleteMany({ conversation: conversation._id });
    await Conversation.deleteOne({ _id: conversation._id });

    res.status(200).json({ message: "Conversation deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// PATCH /chat/:id/title — rename a conversation
export const renameConversation = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const conversation = await Conversation.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title: title.trim() },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
