import { Router } from "express";
import * as cors from "cors";
import {
  getAllAnswers,
  createAnswer,
  getCommentAnswers,
  updateAnswer,
  deleteAnswer,
} from "./../../controllers/fate/answerController";
import { authMiddleware } from "../../middlewares/fate/auth.middleware";
import { adminMiddleware } from "./../../middlewares/fate/admin.middleware";
import { corsOptions } from "./../../middlewares/fate/cors.middleware";
const router = Router();

router.use(cors(corsOptions));

router.get("/", adminMiddleware, getAllAnswers);

router.post("/", authMiddleware, createAnswer);

router.get("/comment/:id", getCommentAnswers);

router.put("/:id", authMiddleware, updateAnswer);

router.delete("/:id", authMiddleware, deleteAnswer);

export default router;
