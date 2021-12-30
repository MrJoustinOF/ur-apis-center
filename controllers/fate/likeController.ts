import Like from "./../../models/fate/Like";

const getAllLikes = async (req, res) => {
  const likes = await Like.find();
  res.json(likes);
};

const addLike = async (req, res) => {
  const { post_id, user_id } = req.body;
  const like = new Like({ post_id, user_id });
  await like.save();

  res.json({ msg: "like added" });
};

const getPostLikes = async (req, res) => {
  const { id } = req.params;
  const likes = await Like.find({ post_id: id });

  res.json(likes);
};

const removeLike = async (req, res) => {
  const { id } = req.params;

  await Like.findByIdAndDelete(id);

  res.json({ msg: "like deleted" });
};

export { getAllLikes, addLike, getPostLikes, removeLike };
