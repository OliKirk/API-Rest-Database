"use strict";

window.addEventListener("load", initApp);

const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app";

// ============================= initApp ================================== //
async function initApp() {
  console.log("initApp is running");

  let posts = await getPosts();
  showPosts(posts);

  const postobject = parseJSONString('{"title": "This is my awesome title", "image": "https://images.unsplash.com/photo-1641876749963-550554c7258d", "description":"IM BIG" }');
  console.log(postobject);

  stringify();
  console.log(stringify);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDialog();
    }
  });
  updatePostsGrid();
  // updateUserGrid();
}

// ============================= ======= ================================== //

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
async function updatePostsGrid() {
  const posts = await getPosts(); // get posts from rest endpoint and save in variable
  showPosts(posts); // show all posts (append to the DOM) with posts as argument
}

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

async function showPosts(posts) {
  for (let textShow of posts) {
    showPost(textShow);
  }
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
<div class="btns">
<button class="btn-update">Update</button>
<button class="btn-delete">Delete</button>
</div>
</article>`;
  document.querySelector("#øv").insertAdjacentHTML("beforeend", imageHTML);
  document.querySelector("#øv article:last-child").addEventListener("click", clickPost);

  document.querySelector("#øv article:last-child .btn-delete").addEventListener("click", deleteClicked);
  document.querySelector("#øv article:last-child .btn-update").addEventListener("click", updateClicked);

  function deleteClicked() {
    deletePost(image.id);
  }

  function updateClicked() {
    const title = `${image.title} Updated <3`;
    const body = "Her er jeg";
    const image = "https://live.staticflickr.com/8638/16315424727_c6347f2b58_b.jpg";
    updatePostsGrid(image.id, title, body, image);
  }

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
async function createPost(title, description, image) {
  const newPost = {
    title: title,
    body: body,
    description: description,
    image: image,
  };
  console.log(newPost);
  const postAsJson = JSON.stringify(newPost);
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });
  const data = await response.json();
  console.log(data);
  updatePostsGrid(); // update the grid of posts: get and show all posts
}

// Kanp for at delete post
async function deletePost(id) {
  const response = await fetch(`${endpoint}/posts/${id}.json`, { method: "DELETE" });
  if (response.ok) {
    console.log("New post suuccesfull deleted from Firebase!");
    updatePostsGrid();
  }
}

async function updatePost(id, title, body, image) {
  const postToUpdate = { title, body, image };
  const json = JSON.stringify(postToUpdate);
  const response = await fetch(`${endpoint}/posts/${id}.json`, { method: "PUT", body: json });

  if (response.ok) {
    console.log("Post succesfully updated in Firebase!");
    updatePostsGrid();
  }
}

// knap for at delte user
function deleteUser() {}
