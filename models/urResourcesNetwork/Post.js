const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = new Schema({
  title: { type: String, required: true, min: 5 },
  desc: { type: String, required: true, min: 10 },
  createdAt: { type: Date, required: true },
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
  },
});

module.exports = mongoose.model("Post", Post);
