import { Schema, model } from "mongoose";

const URRNUser = new Schema({
  name: { type: String, required: true, min: 4 },
  bio: { type: String, required: true, min: 5 },
  email: { type: String, required: true, min: 4 },
  password: { type: String, required: true, min: 8 },
  avatar: { type: String, required: true },
});

export default model("User", URRNUser);
