import firebase from "firebase";
import config from "./config";

const dbName = "postsDB";

export const configureDB = () => {
  // Initialize Firebase
  firebase.initializeApp(config);

  // Initialize indexedDB
  var request = indexedDB.open(dbName, 2);

  request.onupgradeneeded = (event) => {
    var db = event.target.result;
    var objectStore = db.createObjectStore("posts", { autoIncrement: true });
    objectStore.createIndex("author", "author", { unique: false });
    objectStore.createIndex("body", "body", { unique: true });
  };
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


export const loadPostIndexedDB = (callback) => {
  const request = indexedDB.open(dbName, 2);
  request.onsuccess = event => {
    const db = event.target.result;
    const transaction = db.transaction(["posts"], "readwrite");
    const objectStore = transaction.objectStore("posts");

    const postsRequest = objectStore.getAll();
    postsRequest.onsuccess = event => {
      callback(event.target.result);
    }
  }
}

export const addPostsIndexedDB = (posts) => {
  const request = indexedDB.open(dbName, 2);
  request.onsuccess = event => {
    const db = event.target.result;
    const transaction = db.transaction(["posts"], "readwrite");
    const objectStore = transaction.objectStore("posts");

    const postsRequest = objectStore.getAll();
    postsRequest.onsuccess = event => {
      const dbPosts = event.target.result;
      if (dbPosts.length !== posts.length) {
        dbPosts.forEach((post, i) => {
          objectStore.delete(i);
        })
        posts.forEach((posts) => {
          objectStore.add(posts);
        })
      }
    }
  }
}

export const configurePostUpdate = (callback) => {
  
  loadPostIndexedDB(callback);

  firebase.database().ref().child('posts').on('value', snapshot => {
    const posts = [];
    snapshot.forEach(childSnapshot => {
      posts.push(childSnapshot.val());
    });
    
    addPostsIndexedDB(posts);
    
    callback(posts);
  })
};
