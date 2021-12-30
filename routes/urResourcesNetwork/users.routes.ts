import { Router } from "express";
import * as cors from "cors";
import {
  createUser,
  getAllUsers,
  login,
  getOneUser,
  updateUser,
  deleteUser,
} from "./../../controllers/urResourcesNetwork/userController";
const router = Router();

// Cors configuration
const whitelist = ["http://localhost:5876", "https://urrn.vercel.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Create
router.post("/register", cors(corsOptions), createUser);

// Read
router.get("/", cors(corsOptions), getAllUsers);

router.get("/login/:email/:pass", cors(corsOptions), login);

router.get("/:id", cors(corsOptions), getOneUser);

// Update
router.put("/:id", cors(corsOptions), updateUser);

// Delete
router.delete("/:id", cors(corsOptions), deleteUser);

export default router;
