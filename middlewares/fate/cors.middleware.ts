// Fate Front-End development and production routes
const whitelist = [
  "http://localhost:6001",
  "https://fate.vercel.app",
  "https://fate-dev.vercel.app",
];
export const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
