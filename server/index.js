const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Server ready at http://localhost:${process.env.PORT}/api`);
  })
  .catch((err) => {
    console.log(err);
  });
