"use strict";

window.addEventListener("load", initApp);

const endpoint = "https://my-api-database-ccaf8-default-rtdb.europe-west1.firebasedatabase.app/";

async function initApp() {
  console.log("initApp is running");
  let posts = await getPosts();
  for (let textShow of posts) {
    viewImage(textShow);
  }
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

function viewImage(image) {
  console.log("showImage");
  const imageHTML = /*HTML*/ `<article class="grid-iteam">
  <image src="${image.image}"></image>
  <h2>${image.title}</h2>
  </article>`;
  document.querySelector("#øv").insertAdjacentHTML("beforeend", imageHTML);
}
