import * as express from "express";
import * as cors from "cors";
import "./db";
import clientPortfolioRoutes from "./routes/portfolio/clientPortfolios.routes";
import clientGabiRoutes from "./routes/mbPortfolio/clientGabis.routes";
import URRNUserRoutes from "./routes/urResourcesNetwork/users.routes";
import URRNPostRoutes from "./routes/urResourcesNetwork/posts.routes";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// My portfolio
app.use("/api/portfolio", clientPortfolioRoutes);

// urResourcesNetwork
app.use("/api/urresourcesnetwork/users", URRNUserRoutes);
app.use("/api/urresourcesnetwork/posts", URRNPostRoutes);

// Gabi's portfolio
app.use("/api/mbPortfolio", clientGabiRoutes);

app.listen(PORT, () => console.log("Server on port", PORT));
