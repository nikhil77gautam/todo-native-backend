import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  todoThumbnail: { type: Array, default: null },
});

const todoModel = mongoose.model("nativeTodo", todoSchema);
export default todoModel;
