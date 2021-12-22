import * as express from "express";
import * as cors from "cors";
import "./db";
import ClientPortfolio from "./models/portfolio/ClientPortfolio";
import ClientGabi from "./models/mbPortfolio/ClientGabi";
import URRNUser from "./models/urResourcesNetwork/User";
import URRNPost from "./models/urResourcesNetwork/Post";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// My portfolio
app.use("/api/portfolio", ClientPortfolio);

// urResourcesNetwork
app.use("/api/urresourcesnetwork/users", URRNUser);
app.use("/api/urresourcesnetwork/posts", URRNPost);

// Gabi's portfolio
app.use("/api/mbPortfolio", ClientGabi);

app.listen(PORT, () => console.log("Server on port", PORT));
