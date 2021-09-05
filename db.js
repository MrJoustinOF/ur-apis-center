const mongoose = require("mongoose");
const URI =
  "mongodb://u4cyzrqx4ngmupifrast:3WRdqP6NwmJOskEtYLyD@bvifzukjokyd8ku-mongodb.services.clever-cloud.com:27017/bvifzukjokyd8ku";

mongoose
  .connect(URI)
  .then((db) => console.log("DB Coneccted, let's get fun!"))
  .catch((err) => console.log("tenes un error flaco", err));
module.exports = mongoose;
