import Answer from "./../../models/fate/Answer";

const getAllAnswers = async (req, res) => {
  const answers = await Answer.find();
  res.json(answers);
};

const createAnswer = async (req, res) => {
  const { comment_id, desc, user } = req.body;

  const post = new Answer({ comment_id, desc, user });
  await post.save();

  res.json({ msg: "answer published" });
};

const getCommentAnswers = async (req, res) => {
  const { id } = req.params;
  const answers = await Answer.find({ comment_id: id });
  res.json(answers);
};

const updateAnswer = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  await Answer.findByIdAndUpdate(id, { desc });
  res.json({ msg: "answer updated" });
};

const deleteAnswer = async (req, res) => {
  const { id } = req.params;

  await Answer.findByIdAndDelete(id);
  res.json({ msg: "answer deleted" });
};

export {
  getAllAnswers,
  createAnswer,
  getCommentAnswers,
  updateAnswer,
  deleteAnswer,
};
