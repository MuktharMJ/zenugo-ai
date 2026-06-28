import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getConversations,
  createConversation,
  getConversation,
  sendMessage,
  deleteConversation,
  renameConversation,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/", authMiddleware, getConversations);
router.post("/new", authMiddleware, createConversation);
router.get("/:id", authMiddleware, getConversation);
router.post("/:id/message", authMiddleware, sendMessage);
router.delete("/:id", authMiddleware, deleteConversation);
router.patch("/:id/title", authMiddleware, renameConversation);

export default router;
