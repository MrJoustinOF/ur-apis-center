const express = require("express");
const { mongoose } = require("./db");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/portfolio", require("./routes/ClientPortfolio.routes"));

app.listen(port, () => console.log("Server on port", port));
