const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const inputListsArray = [];
// let title;
// let inputTitle;
// let inputPost;
// console.log(inputTitle);
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

  // const url = `/post/${inputTitle}`;

  inputListsArray.push(inputs);

  res.redirect("/");
})

app.get("/post", (req, res) => { // ! Pwede sila isave sa variable?
  const inputTitle = req.query.title;
  const inputPost = req.query.post;
  console.log(inputTitle, inputPost)
  res.render("post", {title: inputTitle, post: inputPost});
})

app.post("/post", (req, res) => {
  const inputTitle = decodeURIComponent(req.body.inputTitle);
  const inputPost = decodeURIComponent(req.body.inputPost);
  const url = `/post?title=${inputTitle}&post=${inputPost}`;
  
  res.redirect(url);
})

// app.post(`/post/${title}`, (req, res) => {
//   console.log("Testing")
//   res.render("post", {title: inputTitle, post: inputPost});
// })

// function dynamicURL(route) {
//     app.post(route, (req, res) => {
//     console.log("test")
//     res.render("post");
//   })
// }

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