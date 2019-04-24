export const writeNewPost = (username, body) => {
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
  
    return firebase.database().ref().update(updates);
  }

  export const fetchPosts = () => {
      return firebase.database().ref().child('posts').on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              console.log(childData);
          })
      })
  }