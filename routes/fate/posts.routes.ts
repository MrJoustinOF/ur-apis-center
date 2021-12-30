import { Router } from "express";
import * as cors from "cors";
import {
  getAllPosts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
} from "./../../controllers/fate/postController";
import { adminMiddleware } from "./../../middlewares/fate/admin.middleware";
import { corsOptions } from "./../../middlewares/fate/cors.middleware";
const router = Router();

router.use(cors(corsOptions));

router.get("/", getAllPosts);

router.post("/", adminMiddleware, createPost);

router.get("/:id", getOnePost);

router.put("/:id", adminMiddleware, updatePost);

router.delete("/:id", adminMiddleware, deletePost);

export default router;
