import { Router } from "express";
import * as cors from "cors";
import {
  getAllAnswers,
  createAnswer,
  getPostAnswers,
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

router.get("/post/:id", getPostAnswers);

router.put("/:id", authMiddleware, updateAnswer);

router.delete("/:id", authMiddleware, deleteAnswer);

export default router;
