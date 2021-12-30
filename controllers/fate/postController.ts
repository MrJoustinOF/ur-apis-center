import Post from "./../../models/fate/Post";
import { storage } from "./../../lib/fate/fb";

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

const createPost = async (req, res) => {
  const { title, desc, imageData, user } = req.body;

  const ref = storage.ref("/posts");
  const uploadImage = ref.child(title + new Date());
  await uploadImage.putString(imageData);
  const image = await uploadImage.getDownloadURL();

  const post = new Post({ title, desc, image, created_at: new Date(), user });
  await post.save();

  res.json({ msg: "post published" });
};

const getOnePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, desc, imageData } = req.body;

  let image;

  if (imageData.includes("https://")) {
    image = imageData;
  } else {
    const ref = storage.ref("/posts");
    const uploadImage = ref.child(title + new Date());
    await uploadImage.putString(imageData);
    image = await uploadImage.getDownloadURL();
  }

  await Post.findByIdAndUpdate(id, { title, desc, image });
  res.json({ msg: "post updated" });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await Post.findByIdAndDelete(id);
  res.json({ msg: "post deleted" });
};

export { getAllPosts, createPost, getOnePost, updatePost, deletePost };
