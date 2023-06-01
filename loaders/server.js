const express = require("express");
const app = express();

//Routes
const user = require("../api/user/route");
const journal = require("../api/journal/router")

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", user);
app.use("/api/v1/journal", journal)

module.exports = app;
