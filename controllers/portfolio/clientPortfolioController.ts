import ClientPortfolio from "./../../models/portfolio/ClientPortfolio";

const saveClient = async (req, res) => {
  const { name, email, message } = req.body;
  const Client = new ClientPortfolio({ name, email, message, isRead: false });
  await Client.save();
  res.json({ status: "client saved" });
};

const getAllClients = async (req, res) => {
  const clients = await ClientPortfolio.find();
  res.json(clients);
};

const getOneClient = async (req, res) => {
  const client = await ClientPortfolio.findById(req.params.id);
  res.json(client);
};

const updateClient = async (req, res) => {
  const { name, email, message, isRead } = req.body;
  const editClient = { name, email, message, isRead };
  await ClientPortfolio.findByIdAndUpdate(req.params.id, editClient);
  res.json({ status: "client updated" });
};

const deleteClient = async (req, res) => {
  await ClientPortfolio.findByIdAndRemove(req.params.id);
  res.json({ status: "client deleted" });
};

export { saveClient, getAllClients, getOneClient, updateClient, deleteClient };
