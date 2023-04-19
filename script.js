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
  // updatePostGrid();
  // updateUserGrid();
}
// Opret nyt post knap
function createPostClicked() {}

// opret ny user
function createUserClicked() {}

// hent data
async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`); //posts.json is the data ressource
  const data = await response.json();
  const posts = preparePostData(data);
  console.log(posts);
  return posts;
}

// Updatere post Grid
function updatePostGrid() {}

// update userGrid
function updateUserGrid() {}

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
    `<article class="grid-iteam">
  <image src="${image.image}"></image>
  <h2>${image.title}</h2>
  <p>${image.body}</p>
<p>${image.uid}</p>
  </article>`;
  document.querySelector("#øv").insertAdjacentHTML("beforeend", imageHTML);
  document.querySelector("#øv article:last-child").addEventListener("click", clickPost);

  function clickPost() {
    let openPost = /*HTML*/ `
      <article id="dialog-list">
      <h2>${image.title}</h2>
        <img src="${image.image}"></img>
        <p>${image.body}</p>
        <button id="close-btn">Close</button>
      </article>
    `;
    // Tilføj eventuelt
    // <p>${image.description}</p> under body

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
    body: body,
    // description: description,
    image: image,
  };
  console.log(newPost);
}
// Kanp for at delete post
function deletePost() {}

// knap for at delte user
function deleteUser() {}
