"use strict";

window.addEventListener("load", initApp);

const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app";

async function initApp() {
  console.log("initApp is running");
  let posts = await getPosts();
  for (let textShow of posts) {
    showPost(textShow);
  }

  const postobject = parseJSONString('{"title": "This is my awesome title", "image": "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app", "description":"IM BIG" }');
  console.log(postobject);

  stringify();
  console.log(stringify);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDialog();
    }
  });
  updatePostGrid();
  updateUserGrid();
}
// Opret nyt post knap
function createPostClicked() {}
// hent data
async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`); //posts.json is the data ressource
  const data = await response.json();
  const posts = preparePostData(data);
  console.log(posts);
  return posts;
}
// Konvater data fra JSON object til et array
function preparePostData(dataObject) {
  const postArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    postArray.push(post);
  }
  console.log(postArray);
  return postArray;
}
//  Viser data via en DOM manipulation
function showPost(image) {
  console.log("showImage");
  const imageHTML =
    /*HTML*/
    `<article class="grid-iteam ikbu">
  <image src="${image.image}"></image>
  <h2>${image.title}</h2>
  </article>`;
  document.querySelector("#øv").insertAdjacentHTML("beforeend", imageHTML);
  document.querySelector("#øv article:last-child").addEventListener("click", clickPost);

  function clickPost() {
    let openPost = /*HTML*/ `
      <article id="dialog-list">
        <img src="${image.image}"></img>
        <h2>${image.title}</h2>
        <p>${image.description}</p>
        <button id="close-btn">Close</button>
      </article>
    `;

    document.querySelector("#dialog").insertAdjacentHTML("beforeend", openPost);
    document.querySelector("#dialog").showModal(image);
    document.querySelector("#dialog").scrollTop = 0;
    document.querySelector("#close-btn").addEventListener("click", closeDialog);
  }
}
// Luk dialog (luk pop-UP Window)
function closeDialog() {
  document.querySelector("#dialog").close();
  document.querySelector("#dialog-list").remove();
}
// Parse JSON string
function parseJSONString(jsonString) {
  const parsed = JSON.parse(jsonString);
  console.log(parsed);
  return parsed;
}
// Parse JSON string via stringify
function stringify(object) {
  const parsed = JSON.stringify(object);
  return parsed;
}
// Opret Post med title, image og description
function createPost(title, description, image) {
  const newPost = {
    title: title,
    description: description,
    image: image,
  };
  console.log(newPost);
}
