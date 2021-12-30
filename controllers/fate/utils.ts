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

export { writeBatchByUser, deleteUserData };
