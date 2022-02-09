import { Router } from "express";
import * as cors from "cors";
import {
  getAllUsers,
  signUp,
  signIn,
  setAdmin,
  setClient,
  updateUser,
  deleteUser,
} from "./../../controllers/fate/userController";
import { authMiddleware } from "../../middlewares/fate/auth.middleware";
import { adminMiddleware } from "../../middlewares/fate/admin.middleware";
import { corsOptions } from "./../../middlewares/fate/cors.middleware";
const router = Router();

router.use(cors(corsOptions));

router.get("/", adminMiddleware, getAllUsers);

router.post("/signup", signUp);

router.post("/token", signIn);

router.put("/setAdmin/:id", adminMiddleware, setAdmin);

router.put("/setClient/:id", adminMiddleware, setClient);

router.put("/:id", authMiddleware, updateUser);

router.delete("/:id", authMiddleware, deleteUser);

export default router;
