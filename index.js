const express = require("express");
const { mongoose } = require("./db");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// My portfolio
app.use("/api/portfolio", require("./routes/portfolio/ClientPortfolio.routes"));

// urResourcesNetwork
app.use(
  "/api/urresourcesnetwork/users",
  require("./routes/urResourcesNetwork/User.routes")
);
app.use(
  "/api/urresourcesnetwork/posts",
  require("./routes/urResourcesNetwork/Post.routes")
);

// Gabi's portfolio
app.use("/api/mbPortfolio", require("./routes/mbPortfolio/mbPortfolio"));

app.listen(port, () => console.log("Server on port", port));
