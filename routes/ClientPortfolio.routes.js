const express = require("express");
const ClientPortfolio = require("./../models/ClientPortfolio");
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  const Client = new ClientPortfolio({ name, email, message, isRead: false });
  await Client.save();
  res.json({ status: "Client saved" });
});

// Read
router.get("/", async (req, res) => {
  const clients = await ClientPortfolio.find();
  res.json(clients);
});

router.get("/:id", async (req, res) => {
  const client = await ClientPortfolio.findById(req.params.id);
  res.json(client);
});

// Update
router.put("/:id", async (req, res) => {
  const { name, email, message, isRead } = req.body;
  const editClient = { name, email, message, isRead };
  await ClientPortfolio.findByIdAndUpdate(req.params.id, editClient);
  res.json({ status: "Client updated" });
});

// Delete
router.delete("/:id", async (req, res) => {
  await ClientPortfolio.findByIdAndRemove(req.params.id);
  res.json({ status: "Client deleted" });
});

module.exports = router;
