const path = require("node:path");
const express = require("express");
const indexRouter = require("./routes/index");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Page not found",
    status: 404,
    message: "That page seems to have wandered off.",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("error", {
    title: "Something went wrong",
    status: 500,
    message: "We could not complete that request. Please try again.",
  });
});

module.exports = app;
