import Post from "./../../models/fate/Post";
import { v4 as uuid } from "uuid";
import { storage } from "./../../lib/fate/fb";
import { deletePostComments, deletePostLikes } from "./utils";

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

const createPost = async (req, res) => {
  const { title, desc, imagesData, user } = req.body;

  let images = [];

  for (const image of imagesData) {
    const ref = storage.ref("/posts");
    const uploadImage = ref.child(title + "_" + uuid());
    await uploadImage.putString(image, "data_url");
    const url = await uploadImage.getDownloadURL();
    images.push(url);
  }

  const post = new Post({
    title,
    desc,
    images,
    created_at: new Date().toUTCString(),
    user,
  });
  await post.save();

  res.json({ msg: "post published" });
};

const getHomePosts = async (req, res) => {
  const allPosts = (await Post.find()).reverse();
  const posts = [];

  for (let i = 0; i < 10; i++) {
    posts.push(allPosts[i]);
  }

  res.json(posts);
};

const getUserPosts = async (req, res) => {
  const { id } = req.params;

  const posts = (await Post.find()).filter(({ user }: any) => user.id === id);
  res.json(posts);
};

const getOnePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, desc, imagesData } = req.body;

  const images = [];

  for (const image of imagesData) {
    if (image.includes("https://")) {
      images.push(image);
    } else {
      const ref = storage.ref("/posts");
      const uploadImage = ref.child(title + uuid());
      await uploadImage.putString(image, "data_url");
      const url = await uploadImage.getDownloadURL();
      images.push(url);
    }
  }

  await Post.findByIdAndUpdate(id, { title, desc, images });
  res.json({ msg: "post updated" });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await Post.findByIdAndDelete(id);
  await deletePostComments(id);
  await deletePostLikes(id);

  res.json({ msg: "post deleted" });
};

export {
  getAllPosts,
  createPost,
  getHomePosts,
  getUserPosts,
  getOnePost,
  updatePost,
  deletePost,
};
