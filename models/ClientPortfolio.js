const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientPortfolio = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, required: true },
});

module.exports = mongoose.model("ClientPortfolio", ClientPortfolio);
