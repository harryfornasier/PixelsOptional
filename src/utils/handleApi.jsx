import axios from "axios";

export async function getData(endpoint) {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoint}`);
  return response.data;
}

export async function getPosts() {
  const posts = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);

  return response.data;
}

export async function getPost(id) {
  const post = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
  return post;
}

export async function getComments(id) {
  const comments = await axios.get(`${import.meta.env.VITE_BASE_URL}/comments/${id}`);
  return comments;
}

export async function sendComment(data) {
  const authToken = localStorage.getItem("authToken");
  try {
    const response = axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, data, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function postData(formData) {
  const authToken = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          authorisation: `Bearer ${authToken}`,
        },
      }
    );
    return response.data.newPost[0];
  } catch (error) {
    console.log(error);
  }
}
