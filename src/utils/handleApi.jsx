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

export async function postData(formData) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
