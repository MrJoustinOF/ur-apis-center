const express = require("express");
const mbPortfolio = require("./../../models/mbPortfolio/mbPortfolio");
const cors = require("cors");
const router = express.Router();

const whitelist = [
  "https://miltonbailondg.netlify.app",
  "http://127.0.0.1:7095",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// CREATE
router.post("/", cors(corsOptions), async (req, res) => {
  const { name, email, message } = req.body;
  const client = new mbPortfolio({ name, email, message });
  await client.save();
  res.json({ msg: "client saved" });
});

// READ
router.get("/", cors(corsOptions), async (req, res) => {
  const clients = await mbPortfolio.find();
  res.json(clients);
});

router.get("/:id", cors(corsOptions), async (req, res) => {
  const client = await mbPortfolio.findById(req.params.id);
  res.json(client);
});

// UPDATE
router.put("/:id", cors(corsOptions), async (req, res) => {
  const { name, email, message } = req.body;
  const clientUpdated = { name, email, message };
  await mbPortfolio.findByIdAndUpdate(req.params.id, clientUpdated);
  res.json({ msg: "client updated" });
});

// DELETE
router.delete("/:id", cors(corsOptions), async (req, res) => {
  await mbPortfolio.findByIdAndRemove(req.params.id);
  res.json({ msg: "client deleted" });
});

module.exports = router;
