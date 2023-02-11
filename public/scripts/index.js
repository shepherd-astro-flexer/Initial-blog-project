const inputPost = document.querySelector(".input-post");

let inputInnerText = inputPost.innerText;

if (inputInnerText.length > 5) {
  
  console.log("test")
}

console.log(inputInnerText.slice(0, 5));

