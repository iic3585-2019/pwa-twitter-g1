
const posts = [
  {
    author: "Florencia",
    description: "Post 1",
  }, 
  {
    author: "Thomas",
    description: "Post 2",
  }
]

const addPost = () => {
  const author = document.getElementById("author-input").value;
  const description = document.getElementById("description-input").value;
  // TODO: send author and description to firebase
};

const button = document.getElementById("post-button");
button.addEventListener("click", addPost);

const postsContainer = document.getElementById("posts-container");
postsContainer.innerHTML = posts.map(post => `
  <div class="post">
    <p class="post-author">${post.author}</p> 
    <p class="post-description">${post.description}</p> 
  </div>
`).join('');

if (module.hot) {
  module.hot.accept();
}
