import { connect } from "mongoose";
import { MONGODB_URI } from "./config";

(async () => {
  try {
    const db = await connect(MONGODB_URI);
    console.log("DB Coneccted, let's get fun!");
  } catch (err) {
    console.log("tenes un error flaco", err);
  }
})();
