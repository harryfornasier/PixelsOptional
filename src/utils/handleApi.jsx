import axios from "axios";

export async function getData(endpoint) {
  const response = await axios.get(`${import.meta.env.VITE_TEST_URL}${endpoint}`);
  return response.data;
}

export async function getPosts() {
  const posts = await axios.get(`${import.meta.env.VITE_TEST_URL}/posts`);

  return response.data;
}

export async function postData(formData) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_TEST_URL}/posts`,
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
