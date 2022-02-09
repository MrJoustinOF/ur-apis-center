import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import "./db";

// My portfolio routes
import clientPortfolioRoutes from "./routes/portfolio/clientPortfolios.routes";

// My partner's portfolio routes
import clientGabiRoutes from "./routes/mbPortfolio/clientGabis.routes";

// Routes for my project called urResourcesNetwork
import URRNUserRoutes from "./routes/urResourcesNetwork/users.routes";
import URRNPostRoutes from "./routes/urResourcesNetwork/posts.routes";

// Fate routes
import FateUserRoutes from "./routes/fate/users.routes";
import FatePostRoutes from "./routes/fate/posts.routes";
import FateLikeRoutes from "./routes/fate/likes.routes";
import FateCommentRoutes from "./routes/fate/comments.routes";
import FateAnswerRoutes from "./routes/fate/answers.routes";

// App
const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.json());
app.use(bodyParser.json({ limit: "25mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(bodyParser.text({ limit: "25mb" }));

// Endpoint to wake up the app because of Heroku
app.get("/api/wakeup", (req, res) =>
  res.status(200).json({ msg: "thanks for waking me up!" })
);

// My portfolio
app.use("/api/portfolio", clientPortfolioRoutes);

// urResourcesNetwork
app.use("/api/urresourcesnetwork/users", URRNUserRoutes);
app.use("/api/urresourcesnetwork/posts", URRNPostRoutes);

// Gabi's portfolio
app.use("/api/mbPortfolio", clientGabiRoutes);

// Fate
app.use("/api/fate/users", FateUserRoutes);
app.use("/api/fate/posts", FatePostRoutes);
app.use("/api/fate/likes", FateLikeRoutes);
app.use("/api/fate/comments", FateCommentRoutes);
app.use("/api/fate/answers", FateAnswerRoutes);

app.listen(PORT, () => console.log("Server on port", PORT));
