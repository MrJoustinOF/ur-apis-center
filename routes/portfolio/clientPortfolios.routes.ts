import * as express from "express";
import * as cors from "cors";
import {
  saveClient,
  getAllClients,
  getOneClient,
  updateClient,
  deleteClient,
} from "./../../controllers/portfolio/clientPortfolioController";
const router = express.Router();

// Whitelists
const postWhitelist = [
  "https://ortizjoustin.vercel.app",
  "http://localhost:1601",
];
const restWhitelist = [
  "https://wbdasclientseljous.netlify.app",
  "http://localhost:4914",
];

let corsPostOptions = {
  origin: function (origin, callback) {
    if (postWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

let corsRestOptions = {
  origin: function (origin, callback) {
    if (restWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Create
router.post("/", cors(corsPostOptions), saveClient);

// Read
router.get("/", cors(corsRestOptions), getAllClients);

router.get("/:id", cors(corsRestOptions), getOneClient);

// Update
router.put("/:id", cors(corsRestOptions), updateClient);

// Delete
router.delete("/:id", cors(corsRestOptions), deleteClient);

export default router;
