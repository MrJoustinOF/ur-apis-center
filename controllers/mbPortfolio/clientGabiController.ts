import ClientGabi from "./../../models/mbPortfolio/ClientGabi";

const saveClient = async (req, res) => {
  const { name, email, message } = req.body;
  const client = new ClientGabi({ name, email, message });
  await client.save();
  res.json({ msg: "client saved" });
};

const getAllClients = async (req, res) => {
  const clients = await ClientGabi.find();
  res.json(clients);
};

const getOneClient = async (req, res) => {
  const client = await ClientGabi.findById(req.params.id);
  res.json(client);
};

const updateClient = async (req, res) => {
  const { name, email, message } = req.body;
  const clientUpdated = { name, email, message };
  await ClientGabi.findByIdAndUpdate(req.params.id, clientUpdated);
  res.json({ msg: "client updated" });
};

const deleteClient = async (req, res) => {
  await ClientGabi.findByIdAndRemove(req.params.id);
  res.json({ msg: "client deleted" });
};

export { saveClient, getAllClients, getOneClient, updateClient, deleteClient };
