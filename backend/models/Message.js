import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);