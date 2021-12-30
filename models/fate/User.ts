import { Schema, model } from "mongoose";

const FateUser = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  role: { type: String, required: true },
  birth_date: { type: Date, required: true },
});

export default model("FateUser", FateUser);
