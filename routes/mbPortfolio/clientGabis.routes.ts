import * as express from "express";
import * as cors from "cors";
import {
  saveClient,
  getAllClients,
  getOneClient,
  updateClient,
  deleteClient,
} from "./../../controllers/mbPortfolio/clientGabiController";
const router = express.Router();

const whitelist = [
  "https://miltonbailondg.netlify.app",
  "http://127.0.0.1:7095",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// CREATE
router.post("/", cors(corsOptions), saveClient);

// READ
router.get("/", cors(corsOptions), getAllClients);

router.get("/:id", cors(corsOptions), getOneClient);

// UPDATE
router.put("/:id", cors(corsOptions), updateClient);

// DELETE
router.delete("/:id", cors(corsOptions), deleteClient);

export default router;
