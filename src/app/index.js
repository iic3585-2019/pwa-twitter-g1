import { writeNewPost as writeNewPost, fetchPosts as fetchPosts } from './db';

console.log('Hola mundo!');

if (module.hot) {
  module.hot.accept();
}
