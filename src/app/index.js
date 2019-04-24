import { writeNewPost, fetchPosts, configureDB } from './db';
import $ from "jquery";


$(() => {
  configureDB();
  fetchPosts();
});


if (module.hot) {
  module.hot.accept();
}
