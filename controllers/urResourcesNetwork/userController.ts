import * as hash from "password-hash";
import URRNUser from "../../models/urResourcesNetwork/User";

const createUser = async (req, res) => {
  let { name, email, password } = req.body;
  const userDB = await URRNUser.find({ email });

  if (userDB.length === 0) {
    password = hash.generate(password);
    const userToSave = new URRNUser({
      name,
      bio: "Not bio yet",
      email,
      password,
      avatar: "/img/user.webp",
    });
    await userToSave.save();

    res.json({ msg: "user created" });
  } else {
    res.status(403).send({ msg: "user already exists" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await URRNUser.find();
  res.json(users);
};

const login = async (req, res) => {
  const userRequest: any = await URRNUser.find({ email: req.params.email });
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
};

const getOneUser = async (req, res) => {
  const user: any = await URRNUser.findById(req.params.id);
  const { name, bio, avatar } = user;
  res.json({ name, bio, avatar });
};

const updateUser = async (req, res) => {
  const { name, bio, email, password, avatar } = req.body;
  const user = { name, bio, email, password, avatar };
  await URRNUser.findByIdAndUpdate(req.params.id, user);
  res.json({ msg: "user updated" });
};

const deleteUser = async (req, res) => {
  await URRNUser.findByIdAndDelete(req.params.id);
  res.json({ msg: "user deleted" });
};

export { createUser, getAllUsers, login, getOneUser, updateUser, deleteUser };
