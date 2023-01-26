require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const AuthRouter = require("./router/AuthRouter");
const PostRouter = require("./router/PostRouter");
const mongoose = require("mongoose");

// Use Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Import Router
app.use("/api", AuthRouter);
app.use("/api", PostRouter);

// Connection
const config = require("./config");
const dbUrl = config.dbUrl;

var options = {
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);
mongoose
  .connect(dbUrl, options)
  .then(() => {
    console.log(`connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server is running on : http://localhost:${process.env.APP_PORT}/`
  );
});
