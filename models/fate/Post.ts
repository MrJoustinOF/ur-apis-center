import { Schema, model } from "mongoose";

const FatePost = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  created_at: { type: Date, required: true },
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
  },
});

export default model("FatePost", FatePost);
