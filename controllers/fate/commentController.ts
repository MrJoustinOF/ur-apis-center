import Comment from "./../../models/fate/Comment";

const getAllComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

const createComment = async (req, res) => {
  const { post_id, desc, user } = req.body;

  const post = new Comment({ post_id, desc, user });
  await post.save();

  res.json({ msg: "comment created" });
};

const getPostComments = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ post_id: id });
  res.json(comments);
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  await Comment.findByIdAndUpdate(id, { desc });
  res.json({ msg: "comment updated" });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  await Comment.findByIdAndDelete(id);
  res.json({ msg: "comment deleted" });
};

export {
  getAllComments,
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
};
