const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const inputListsArray = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {inputLists: inputListsArray});
})

app.post("/", (req, res) => {
  const inputTitle = req.body.inputTitle;
  const inputPost = req.body.inputPost;
  const inputs = {
    title: inputTitle,
    post: inputPost
  }

  inputListsArray.push(inputs);

  res.redirect("/");
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.get("/contact", (req, res) => {
  res.render("contact-us");
})

app.get("/about", (req, res) => {
  res.render("about-us");
})

app.listen(3000, () => {
  console.log("Server has started on port 3000.")
})