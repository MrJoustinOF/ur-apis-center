import { Schema, model } from "mongoose";

const FateComment = new Schema({
  post_id: { type: String, required: true },
  desc: { type: String, required: true },
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
  },
});

export default model("FateComment", FateComment);
