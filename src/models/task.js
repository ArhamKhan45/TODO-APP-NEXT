import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [4, "name too short"],
  },
  description: {
    type: String,
    required: true,
    maxlength: [120, "name too short"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const modelTask = mongoose.models.Task || mongoose.model("Task", schema);
