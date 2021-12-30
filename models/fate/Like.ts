import { Schema, model } from "mongoose";

const FateLike = new Schema({
  post_id: { type: String, required: true },
  user_id: { type: String, required: true },
});

export default model("FateLike", FateLike);
