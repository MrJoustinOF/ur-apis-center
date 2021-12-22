import { Schema, model } from "mongoose";

const ClientGabi = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export default model("ClientGabi", ClientGabi);
