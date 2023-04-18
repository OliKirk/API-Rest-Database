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

  // stringify();
  // console.log(stringify);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDialog();
    }
  });
}

async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`); //posts.json is the data ressource
  const data = await response.json();
  const posts = preparePostData(data);
  console.log(posts);
  return posts;
}

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

function closeDialog() {
  document.querySelector("#dialog").close();
  document.querySelector("#dialog-list").remove();
}

function parseJSONString(jsonString) {
  const parsed = JSON.parse(jsonString);
  console.log(parsed);
  return parsed;
}

function stringify(object) {
  const parsed = JSON.parse(jsonString);
  return jsonString;
}

function createPost(title, description, image) {
  const newPost = {
    title: title,
    description: description,
    image: image,
  };
  console.log(newPost);
}
