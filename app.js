const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const defaultContent = require(__dirname + `\\default-content.js`) // Since we are not installing a module using NPM(meaning we are creating our own module, and the module is NOT remote), then we must specify the location of the file that we are referrencing

const app = express();

const inputListsArray = []; // ! This should be at the top, so other functions can reach it

app.use(express.static("public"));

// app.use("/hello/sample", express.static("public")) // ! Pwede pala multiple na ganito

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("testing", {inputLists: inputListsArray, homeContent: defaultContent.home});
})

// app.post("/", (req, res) => {
  
// })

// app.post(`/post`, (req, res) => {

// })

// app.get(`/post/${inputTitle}`, (req, res) => {
//   res.render("post");
// })

// app.post("/post", (req, res) => {
//   let inputTitle = req.body.inputTitle; // Pwede kong makita yung full na version nung text basta na encode ko na, kahit hindi ko pa i-decode, pero merong mga special characters na idadagdag ang node sa mga spaces
//   const inputPost = req.body.inputPost;

//   console.log(inputTitle, inputPost);
//   res.render("post");
//   res.redirect(`/post/${inputTitle}`);
// })

// app.get("/post", (req, res) => { // ! Pwede sila isave sa variable?
//   const inputTitle = req.query.title;
//   const inputPost = req.query.post;
//   res.render("post", {title: inputTitle, post: inputPost});
// })

// app.post("/post", (req, res) => {
//   const inputTitle = decodeURIComponent(req.body.inputTitle);
//   const inputPost = decodeURIComponent(req.body.inputPost);
//   const url = `/post?title=${inputTitle}&post=${inputPost}`;

//   res.redirect(url);
// })

// app.get("/post/:topic", (req, res) => {
  
//   res.render("post")
// })

// app.post("/post/:topic", (req, res) => { // ! By adding a : after the / means its a parameter. In this case, topic is the name of the parameter and it can be anything you want, then once you go to localhost:3000/post/mumbojumbo, it is so that you can create dynamic get and post request on the go
//   const inputTitle = decodeURIComponent(req.body.inputTitle);
//   const inputPost = decodeURIComponent(req.body.inputPost)
//   console.log(`This is from the /post/:topic route: ${req.params.topic}`)
//   // console.log(req.params.topic);
//   res.render("posts", {
//     title: inputTitle,
//     post: inputPost
//   })
// })

// app.get("/post/:first-:second", (req, res) => { // ! Added a - to specify that a " "(space) should be a -
//   const first = req.params.first;
//   const second = req.params.second;
//   const combinedParam = `${first} ${second}`; // ! Concatenated the first and second param, and we must type in a - instead of empty space on the search bar e.g. localhost:3000/post/Day-1 when the title is Day 1, instead of typing /post/Day 1
//   inputListsArray.forEach(inputs => {
//     // const includes = inputs.title.includes(combinedParam);
//     // console.log(inputs.title);
//     // combinedParam === inputs.title || `${first} ${second}` === inputs.title || first === inputs.title)
//     if (inputs.title.includes(combinedParam)) { // ! We tested the req.params.topic and compared it to the inputs.title. If its the same, render the page with the input.title and input.post, if not then give an error message
//       console.log(`I'm on the if statement: req.params.first: ${typeof combinedParam}, inputs.title: ${typeof inputs.title}`)
//       res.render("post", {title: inputs.title, post: inputs.post})
//     } else {
//       console.log(req.statusCode, `I'm on the else statement. result is: ${typeof combinedParam} and ${typeof inputs.title}`)
//       // res.redirect("/post")
//     }
//   })
// })

// app.get("/post/:random", (req, res) => { // ! Added a - to specify that a " "(space) should be a -
//   const first = req.params.random;
//   console.log(req.params.random);
//   inputListsArray.forEach(inputs => {
//     if (inputs.title.includes(first)) {
//       console.log("I'm on the if")
//       res.render("post", {title: inputs.title, post: inputs.post})
//     } else {
//       console.log("I'm on the else statement")
//       // res.redirect("/post")
//     }
//   })
// })

app.get("/post/:postName", (req, res) => {
  const param = _.lowerCase(req.params.postName);
  inputListsArray.forEach(inputs => {
    const inputTitle = _.lowerCase(inputs.title);
    if (inputTitle.includes(param)) {
      console.log(`MATCH FOUND! param: ${param}, inputTitle: ${inputTitle}`);
      res.render("posts", {title: inputs.title, post: inputs.post})
    } else {
      console.log(`Not Found... param: ${param}, inputTitle: ${inputTitle}`);
      // res.render("not-found") // ! Dapat 'di dito mag-render kasi forEach gamit natin
      // res.render
    }
  })
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose", (req, res) => {
  // const inputTitle = ; // ! Hindi na necessary na i-save pa sa variable, pwede namang rekta na sa object, kasi variable din naman ang 'name' ng object
  const inputs = {
    title: req.body.inputTitle,
    post: req.body.inputPost
  };

  inputListsArray.push(inputs);

  res.redirect("/"); // get request ang ginagawa ng redirect
})

app.get("/contact", (req, res) => {
  res.render("contact-us", {contactContent: defaultContent.contact});
})

app.get("/about", (req, res) => {
  res.render("about-us", {aboutContent: defaultContent.about});
})

app.listen(3000, () => {
  console.log("Server has started on port 3000.")
})