const express = require("express");

const bodyParser = require("body-parser");
const v1CatRouter = require("./v1/routes/catRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/cats", v1CatRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
