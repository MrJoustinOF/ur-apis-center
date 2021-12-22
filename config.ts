import { config } from "dotenv";

config();

const MONGODB_URI = process.env.MONGOD_URI;

export { MONGODB_URI };
