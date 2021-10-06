const express = require("express");
const User = require("./../../models/urResourcesNetwork/User");
const hash = require("password-hash");
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
router.post(
  "/register",
  /*cors(corsOptions),*/ async (req, res) => {
    let { name, email, password } = req.body;
    const userDB = await User.find({ email });

    if (userDB.length === 0) {
      password = hash.generate(password);
      const userToSave = new User({
        name,
        bio: "Not bio yet",
        email,
        password,
        avatar: "./img/user.webp",
      });
      await userToSave.save();

      res.json({ msg: "user created" });
    } else {
      res.status(403).send({ msg: "user already exists" });
    }
  }
);

// Read
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/login/:email/:pass", async (req, res) => {
  const userRequest = await User.find({ email: req.params.email });
  if (userRequest.length === 0) {
    res.status(404).json({ msg: "user doesn't exist" });
  } else if (!hash.verify(req.params.pass, userRequest[0].password)) {
    res.status(403).json({ msg: "wrong password" });
  } else {
    const user = {
      avatar: userRequest[0].avatar,
      bio: userRequest[0].bio,
      email: userRequest[0].email,
      name: userRequest[0].name,
      password: userRequest[0].password,
      id: userRequest[0]._id,
    };

    res.json({ msg: "user loged", user });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const { name, bio, avatar } = user;
  res.json({ name, bio, avatar });
});

// Update
router.put("/:id", async (req, res) => {
  const { name, bio, email, password, avatar } = req.body;
  const user = { name, bio, email, password, avatar };
  await User.findByIdAndUpdate(req.params.id, user);
  res.json({ msg: "user updated" });
});

// Delete
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "user deleted" });
});

module.exports = router;
