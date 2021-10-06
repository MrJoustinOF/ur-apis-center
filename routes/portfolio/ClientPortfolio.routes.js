const express = require("express");
const ClientPortfolio = require("./../../models/portfolio/ClientPortfolio");
const cors = require("cors");
const router = express.Router();

// Whitelists
const postWhitelist = [
  "https://ortizjoustin.vercel.app",
  "http://localhost:1601",
];
const restWhitelist = [
  "https://wbdasclientseljous.netlify.app",
  "http://localhost:4914",
];

let corsPostOptions = {
  origin: function (origin, callback) {
    if (postWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

let corsRestOptions = {
  origin: function (origin, callback) {
    if (restWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Create
router.post("/", cors(corsPostOptions), async (req, res) => {
  const { name, email, message } = req.body;
  const Client = new ClientPortfolio({ name, email, message, isRead: false });
  await Client.save();
  res.json({ status: "Client saved" });
});

// Read
router.get("/", cors(corsRestOptions), async (req, res) => {
  const clients = await ClientPortfolio.find();
  res.json(clients);
});

router.get("/:id", cors(corsRestOptions), async (req, res) => {
  const client = await ClientPortfolio.findById(req.params.id);
  res.json(client);
});

// Update
router.put("/:id", cors(corsRestOptions), async (req, res) => {
  const { name, email, message, isRead } = req.body;
  const editClient = { name, email, message, isRead };
  await ClientPortfolio.findByIdAndUpdate(req.params.id, editClient);
  res.json({ status: "Client updated" });
});

// Delete
router.delete("/:id", cors(corsRestOptions), async (req, res) => {
  await ClientPortfolio.findByIdAndRemove(req.params.id);
  res.json({ status: "Client deleted" });
});

module.exports = router;
