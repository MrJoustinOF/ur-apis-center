import { Router } from "express";
import * as cors from "cors";
import {
  getAllComments,
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
} from "./../../controllers/fate/commentController";
import { authMiddleware } from "../../middlewares/fate/auth.middleware";
import { adminMiddleware } from "./../../middlewares/fate/admin.middleware";
import { corsOptions } from "./../../middlewares/fate/cors.middleware";
const router = Router();

router.use(cors(corsOptions));

router.get("/", adminMiddleware, getAllComments);

router.post("/", authMiddleware, createComment);

router.get("/post/:id", getPostComments);

router.put("/:id", authMiddleware, updateComment);

router.delete("/:id", authMiddleware, deleteComment);

export default router;
