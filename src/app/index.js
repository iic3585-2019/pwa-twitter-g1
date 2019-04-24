import $ from "jquery";

import { writeNewPost, fetchPosts, configureDB } from './db';

import "./styles/index.scss"

const updatePosts = () => {
  fetchPosts((posts) => {
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
    writeNewPost(author, description, (err) => {
      if (!err) {
        updatePosts();
      } else {
        console.error(err);
      }
    });
  });
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
          console.log('Service Worker registration completed with scope: ',
            registration.scope)
        }, (err) => {
          console.log('Service Worker registration failed', err)
        })
    });
  } else {
    console.log('Service Worker registration failed', err)
  }
});

if (module.hot) {
  module.hot.accept();
}
