import URRNPost from "./../../models/urResourcesNetwork/Post";

const createPost = async (req, res) => {
  const { title, desc, user } = req.body;
  const post = new URRNPost({ title, desc, createdAt: new Date(), user });
  await post.save();
  res.json({ msg: "post published" });
};

const getAllPosts = async (req, res) => {
  const posts = await URRNPost.find();
  res.json(posts);
};

const getUserPosts = async (req, res) => {
  const { id } = req.params;
  const posts = (await URRNPost.find()).filter(
    (post: any) => post.user.id === id
  );
  res.json(posts);
};

const getOnePost = async (req, res) => {
  const post = await URRNPost.findById(req.params.id);
  res.json(post);
};

const updateUserPosts = async (req, res) => {
  const { posts } = req.body;
  posts.map(async (post) => {
    await URRNPost.findByIdAndUpdate(post._id, post);
  });
  res.json({ msg: "posts updated" });
};

const updatePost = async (req, res) => {
  const { title, desc, user } = req.body;
  const post = { title, desc, user };
  await URRNPost.findByIdAndUpdate(req.params.id, post);
  res.json({ msg: "post updated" });
};

const deletePost = async (req, res) => {
  await URRNPost.findByIdAndDelete(req.params.id);
  res.json({ msg: "post deleted" });
};

export {
  createPost,
  getAllPosts,
  getUserPosts,
  getOnePost,
  updateUserPosts,
  updatePost,
  deletePost,
};
