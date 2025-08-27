const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.use((req, res) => {
  res.status(404).render("error");
});

app.listen(8000, () => {
  console.log("Portfolio website running on http://localhost:8000");
});
