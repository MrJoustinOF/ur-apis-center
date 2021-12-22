import * as express from "express";
import * as cors from "cors";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  getOnePost,
  updateUserPosts,
  updatePost,
  deletePost,
} from "./../../controllers/urResourcesNetwork/postController";
const router = express.Router();

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
router.post("/", cors(corsOptions), createPost);

// Read
router.get("/", cors(corsOptions), getAllPosts);

router.get("/user/:id", cors(corsOptions), getUserPosts);

router.get("/:id", cors(corsOptions), getOnePost);

// Update
router.put("/user/:id", cors(corsOptions), updateUserPosts);

router.put("/:id", cors(corsOptions), updatePost);

// Delete
router.delete("/:id", cors(corsOptions), deletePost);

export default router;
