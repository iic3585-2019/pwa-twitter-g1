import $ from "jquery";

import { writeNewPost, configurePostUpdate, configureDB } from './db';

import "./styles/index.scss"

let registration;

const updatePosts = () => {
  configurePostUpdate((posts) => {
    if (registration && Notification.permission === "granted") {
      registration.showNotification("Feed update", {
        body: "¡Your feed has been updated!"
      });
    }
    console.log(Notification.permission);
    console.log(registration);
    console.log(posts);
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = posts.map(post => `
  <div class="post">
    <p class="post-author">${post.author}</p> 
    <p class="post-description">${post.body}</p> 
  </div>
`).join('');
  });
};

$(() => {
  configureDB();
  updatePosts();
  $("#post-button").click(() => {
    const author = $("#author-input").val();
    const description = $("#description-input").val();
    writeNewPost(author, description);
  });
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then((reg) => {
        registration = reg;
        console.log('Service Worker registration completed with scope: ',
          reg.scope);
        Notification.requestPermission();
        console.log("Asked notification");
      }, (err) => {
        console.log('Service Worker registration failed', err)
      })
  } else {
    console.log('Service Worker registration failed')
  }
});

if (module.hot) {
  module.hot.accept();
}
