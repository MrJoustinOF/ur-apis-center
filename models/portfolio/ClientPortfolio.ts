import { Schema, model } from "mongoose";

const ClientPortfolio = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, required: true },
});

export default model("ClientPortfolio", ClientPortfolio);
