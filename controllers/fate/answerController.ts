import Answer from "./../../models/fate/Comment";

const getAllAnswers = async (req, res) => {
  const answers = await Answer.find();
  res.json(answers);
};

const createAnswer = async (req, res) => {
  const { post_id, desc, user } = req.body;

  const post = new Answer({ post_id, desc, user });
  await post.save();

  res.json({ msg: "comment created" });
};

const getPostAnswers = async (req, res) => {
  const { id } = req.params;
  const answers = await Answer.find({ post_id: id });
  res.json(answers);
};

const updateAnswer = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  await Answer.findByIdAndUpdate(id, { desc });
  res.json({ msg: "comment updated" });
};

const deleteAnswer = async (req, res) => {
  const { id } = req.params;

  await Answer.findByIdAndDelete(id);
  res.json({ msg: "comment deleted" });
};

export {
  getAllAnswers,
  createAnswer,
  getPostAnswers,
  updateAnswer,
  deleteAnswer,
};
