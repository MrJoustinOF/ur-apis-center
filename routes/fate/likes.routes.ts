import { Router } from "express";
import * as cors from "cors";
import {
  getAllLikes,
  addLike,
  getPostLikes,
  removeLike,
} from "./../../controllers/fate/likeController";
import { authMiddleware } from "./../../middlewares/fate/auth.middleware";
import { adminMiddleware } from "./../../middlewares/fate/admin.middleware";
import { corsOptions } from "./../../middlewares/fate/cors.middleware";
const router = Router();

router.use(cors(corsOptions));

router.get("/", adminMiddleware, getAllLikes);

router.post("/", authMiddleware, addLike);

router.get("/post/:id", getPostLikes);

router.delete("/:id", authMiddleware, removeLike);

export default router;
