import * as jwt from "jsonwebtoken";
import { SECRET } from "./../../config";

export const adminMiddleware = (req, res, next) => {
  const authHeader = req.get("authorization");

  if (authHeader) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const { role } = jwt.verify(token, SECRET);

      if (role === "admin") {
        next();
      } else {
        res.status(403).json({ msg: "not authorized, admin required" });
      }
    } catch (error) {
      res.status(401).json({ msg: "error when validating the token" });
    }
  } else {
    res.status(400).json({ msg: "header authorization doesn't exists" });
  }
};
