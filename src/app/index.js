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
  })
});

if (module.hot) {
  module.hot.accept();
}
