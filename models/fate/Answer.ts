import { Schema, model } from "mongoose";

const FateAnswer = new Schema({
  comment_id: { type: String, required: true },
  desc: { type: String, required: true },
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
  },
});

export default model("FateAnswer", FateAnswer);
