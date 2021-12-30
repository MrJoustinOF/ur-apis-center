import * as jwt from "jsonwebtoken";
import * as hash from "password-hash";
import User from "./../../models/fate/User";
import { writeBatchByUser, deleteUserData } from "./utils";
import { storage } from "./../../lib/fate/fb";
import { SECRET } from "./../../config";

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const signUp = async (req, res) => {
  const { name, email } = req.body;
  const password = req.body.password.toString();
  const avatar =
    "https://firebasestorage.googleapis.com/v0/b/fate-eea84.appspot.com/o/users%2Fuser.webp?alt=media&token=2c882153-bed1-4104-81c1-80dda3857cae";

  const verifyEmail = await User.findOne({ email });

  if (!verifyEmail) {
    const user = new User({
      name,
      email,
      password: hash.generate(password),
      avatar,
      role: "client",
      birth_date: new Date(req.body.birth_date),
    });
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        name,
        email,
        password,
        avatar,
        role: "client",
        birth_date: user.get("birth_date"),
      },
      SECRET
    );

    res.json({ msg: "user saved", token });
  } else {
    res.status(400).json({ msg: "email already used" });
  }
};

const signIn = async (req, res) => {
  const { email } = req.body;
  const password = req.body.password.toString();

  const user = await User.findOne({ email });

  if (user) {
    const passToVerify = user.get("password");
    const verifyPassword = hash.verify(password, passToVerify);

    if (verifyPassword) {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.get("name"),
          email,
          password,
          avatar: user.get("avatar"),
          role: user.get("role"),
          birth_date: user.get("birth_date"),
        },
        SECRET
      );

      res.json({ token });
    } else {
      res.status(403).json({ msg: "wrong password" });
    }
  } else {
    res.status(404).json({ msg: "user doesn't exist" });
  }
};

const setAdmin = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(id, { role: "admin" });
  res.json({ msg: "admin updated" });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, avatarData, birth_date } = req.body;
  const password = req.body.password.toString();

  let avatar;

  if (avatarData.includes("https://")) {
    avatar = avatarData;
  } else {
    const ref = storage.ref("/users");
    const uploadAvatar = ref.child(id);
    await uploadAvatar.putString(avatarData);
    avatar = await uploadAvatar.getDownloadURL();
  }

  const user = { name, password: hash.generate(password), avatar, birth_date };
  await User.findByIdAndUpdate(id, user);

  // Write batch to update all the data of other models
  await writeBatchByUser({ id, name, avatar });

  // Parse data to jwt
  delete req.body["avatarData"];
  const parsedBirthDate = new Date(birth_date);

  const token = jwt.sign(
    {
      id,
      ...req.body,
      avatar,
      birth_date: parsedBirthDate,
    },
    SECRET
  );

  res.json({ msg: "user updated", token });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);

  // Delete All user data
  await deleteUserData(id);

  res.json({ msg: "user deleted" });
};

export { getAllUsers, signUp, signIn, setAdmin, updateUser, deleteUser };
