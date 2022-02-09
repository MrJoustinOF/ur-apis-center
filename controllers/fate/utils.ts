import Post from "./../../models/fate/Post";
import Like from "./../../models/fate/Like";
import Comment from "./../../models/fate/Comment";
import Answer from "./../../models/fate/Answer";

const writeBatchByUser = async ({ id, name, avatar }) => {
  await Post.updateMany(
    { user: { id } },
    {
      user: {
        id,
        name,
        avatar,
      },
    }
  );

  await Comment.updateMany(
    { user: { id } },
    {
      user: {
        id,
        name,
        avatar,
      },
    }
  );

  await Answer.updateMany(
    { user: { id } },
    {
      user: {
        id,
        name,
        avatar,
      },
    }
  );
};

const deleteUserData = async ({ id }) => {
  await Post.deleteMany({ user: id });
  await Like.deleteMany({ user_id: id });
  await Comment.deleteMany({ user: id });
  await Answer.deleteMany({ user: id });
};

const deleteCommentAnswers = async (comment_id) => {
  await Answer.deleteMany({ comment_id });
};

const deletePostComments = async (post_id) => {
  const getComments = await Comment.find({ post_id });
  const commentsIds = getComments.map(({ _id: id }) => id);

  for (const id of commentsIds) {
    await deleteCommentAnswers(id);
  }

  await Comment.deleteMany({ post_id });
};

const deletePostLikes = async (post_id) => {
  await Like.deleteMany({ post_id });
};

export {
  writeBatchByUser,
  deleteUserData,
  deleteCommentAnswers,
  deletePostComments,
  deletePostLikes,
};
