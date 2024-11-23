import axios from "axios";

export async function getData(endpoint) {
  const response = await axios.get(`${import.meta.env.VITE_TEST_URL}${endpoint}`);
  return response.data;
}

export async function getPosts() {
  const posts = await axios.get(`${import.meta.env.VITE_TEST_URL}/posts`);

  return response.data;
}
