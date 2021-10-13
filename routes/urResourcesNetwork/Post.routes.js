const express = require("express");
const Post = require("./../../models/urResourcesNetwork/Post");
const cors = require("cors");
const router = express.Router();

// Cors configuration
const whitelist = ["http://localhost:5876", "https://urrn.vercel.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Create
router.post("/", cors(corsOptions), async (req, res) => {
  const { title, desc, user } = req.body;
  const post = new Post({ title, desc, createdAt: new Date(), user });
  await post.save();
  res.json({ msg: "post published" });
});

// Read
router.get("/", cors(corsOptions), async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.get("/user/:id", cors(corsOptions), async (req, res) => {
  const { id } = req.params;
  const posts = (await Post.find()).filter((post) =>
    post.user.id === id ? true : false
  );
  res.json(posts);
});

router.get("/:id", cors(corsOptions), async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// Update
router.put("/user/:id", cors(corsOptions), async (req, res) => {
  const { posts } = req.body;
  posts.map(async (post) => {
    await Post.findByIdAndUpdate(post._id, post);
  });
  res.json({ msg: "posts updated" });
});

router.put("/:id", cors(corsOptions), async (req, res) => {
  const { title, desc, user } = req.body;
  const post = { title, desc, user };
  await Post.findByIdAndUpdate(req.params.id, post);
  res.json({ msg: "post updated" });
});

// Delete
router.delete("/:id", cors(corsOptions), async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ msg: "post deleted" });
});

module.exports = router;
