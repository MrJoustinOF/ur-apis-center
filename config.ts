import { config } from "dotenv";

config();

const MONGODB_URI = process.env.MONGODB_URI;

const SECRET = process.env.SECRET;

const FB_API_KEY = process.env.FB_API_KEY;
const FB_AUTH_DOMAIN = process.env.FB_AUTH_DOMAIN;
const FB_PROJECT_ID = process.env.FB_PROJECT_ID;
const FB_STORAGE_BUCKET = process.env.FB_STORAGE_BUCKET;
const FB_MESSAGING_SENDER = process.env.FB_MESSAGING_SENDER;
const FB_APP_ID = process.env.FB_APP_ID;
const FB_MEASUREMENT_ID = process.env.FB_MEASUREMENT_ID;

export {
  MONGODB_URI,
  SECRET,
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  FB_MESSAGING_SENDER,
  FB_APP_ID,
  FB_MEASUREMENT_ID,
};
