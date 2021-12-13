// Dependencies: express, body-parser, mongoose, cors, dotenv
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

// Routes
const port = process.env.PORT || "3000";
const app = express();
const contactRoutes = require("./server/routes/contact.route");

// Connect to MongoDB
if (process.env.STORAGE_TYPE === "DB") {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
// app.use(express.static(`${__dirname}/dist/`));
app.use("/api/contact", contactRoutes);

// Server port listening
app.set("port", port);
app.listen(process.env.PORT || 3000, () => {
  console.log("Node server started");
});
