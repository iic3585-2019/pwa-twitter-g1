import firebase from "firebase";
import config from "./config";


export const configureDB = () => {
  // Initialize Firebase
  firebase.initializeApp(config);
};

export const writeNewPost = (username, body, callback) => {
  // A post entry.
  const postData = {
    author: username,
    body: body,
  };

  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;

  return firebase.database().ref('/posts/' + newPostKey).set(postData, callback);
};

export const configurePostUpdate = (callback) => {
  firebase.database().ref().child('posts').on('value', snapshot => {
    const posts = [];
    snapshot.forEach(childSnapshot => {
      posts.push(childSnapshot.val());
    });
    callback(posts);
  })
};
