"use strict";

window.addEventListener("load", initApp);

const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/posts/1mNVXMNbZWjKsiaTFsDw";

// ============================= initApp ================================== //
async function initApp() {
  console.log("initApp is running");
  updatePostsGrid();
  let posts = await getPosts();
  showPosts(posts);

  const postObject = parseJSONString('{"title": "This is my awesome title", "image": "https://images.unsplash.com/photo-1641876749963-550554c7258d", "description":"IM BIG" }');
  console.log(postObject);

  stringify();
  console.log(stringify);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDialog();
    }
  });
  // updateUserGrid();
}

// ============================= ======= ================================== //

// Opret nyt post knap
function createPostClicked() {}

// Opret ny user
function createUserClicked() {}

// Hent data
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

// Update userGrid
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

// Viser alle posts
function showPosts(listOfPosts) {
  document.querySelector("#posts").innerHTML = "";

  for (const post of listOfPosts) {
    showPost(post);
  }
}

//  Viser data via en DOM manipulation
function showPost(postObject) {
  console.log("showPostObject");
  const postObjectHTML =
    /*HTML*/
    `<article class="grid-iteam">
  <image src="${postObject.image}">
  <h2>${postObject.title}</h2>
  <p>${postObject.body}</p>
<p>${postObject.uid}</p>
<div class="btns">
<button class="btn-update">Update</button>
<button class="btn-delete">Delete</button>
</div>
</article>`;
  document.querySelector("#posts").insertAdjacentHTML("beforeend", postObjectHTML);
  document.querySelector("#posts article:last-child").addEventListener("click", clickPost);
  document.querySelector("#posts article:last-child .btn-delete").addEventListener("click", deleteClicked);
  document.querySelector("#posts article:last-child .btn-update").addEventListener("click", updateClicked);

  // Hvad der sker når man klikke på delete
  function deleteClicked() {
    deletePost(postObject.id);
  }

  // Hvad der sker når man klikker på update
  function updateClicked() {
    const title = `${postObject.title} Updated <3`;
    const body = "Her er jeg";
    const image = "https://live.staticflickr.com/8638/16315424727_c6347f2b58_b.jpg";
    updatePostsGrid(postObject.id, title, body, image);
  }

  // Hvad der sker når man klikker på Post
  function clickPost() {
    let openPost = /*HTML*/ `
      <article id="dialog-list">
      <h2>${postObject.title}</h2>
        <img src="${postObject.image}">
        <p>${postObject.body}</p>
        <button id="close-btn">Close</button>
      </article>
    `;

    // Når dialog åbnes Henter den JSON dataen, Ruller den til top, man kan klikke close button
    document.querySelector("#dialog").insertAdjacentHTML("beforeend", openPost);
    document.querySelector("#dialog").showModal(postObject);
    document.querySelector("#dialog").scrollTop = 0;
    document.querySelector("#close-btn").addEventListener("click", closeDialog);
  }
}

// Knap for at lukke dialog (luk pop-UP Window)
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

// Hvad der sker når man creater et nyt post
async function createPost(title, body, description, image) {
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
    console.log("New post succesfull deleted from Firebase!");
    console.log(response);
    updatePostsGrid();
  }
}

// Hvad der sker når man klikker på update
async function updatePost(id, title, body, image) {
  const postToUpdate = { title, body, image };
  const json = JSON.stringify(postToUpdate);
  const response = await fetch(`${endpoint}/posts/${id}.json`, { method: "PUT", body: json });

  if (response.ok) {
    console.log("Post succesfully updated in Firebase!");
    updatePostsGrid();
  }
}

// Knap for at delte user
function deleteUser() {}
