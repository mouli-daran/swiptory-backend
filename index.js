const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
mongoDB();

// This will allow all CORS requests
app.use(cors());

// app.options("*", cors());

// app.use(
//   cors({
//     origin: "*",
//     methods: ["post", "get", "put", "delete"],
//     "Access-Control-Allow-Credentials": true,
//   })
// );

// ? Regular Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const fileUpload = require("express-fileupload");

// Import all routes here
const user = require("./routes/user");

// Router Middleware
app.use("/api/v1", user);

const port = process.env.PORT || 4000;
app.listen(port, console.log("server is running at " + port, "..."));

// Health api
app.get("/health", (req, res) => {
  res.status(200);

  console.log("Health route is running good!");
});

// home page for server
app.get("/", (req, res) => {
  res.status(200).send("<h1>Home</h1>");
});
