import axios from "axios";

export async function getData(endpoint) {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${endpoint}`);
  return response.data;
}

export async function getPosts(pageNum) {
  const userId = localStorage.getItem("userId");

  const posts = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {
    params: {
      page: pageNum,
      userId: userId,
    },
  });
  return posts.data;
}

export async function getPost(id) {
  const post = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
  return post;
}

export async function getComments(id) {
  try {
    const comments = await axios.get(`${import.meta.env.VITE_BASE_URL}/comments/${id}`);
    return comments;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.clear();
      return error;
    }
  }
}

export async function sendComment(data) {
  const authToken = localStorage.getItem("authToken");
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, data, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
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
    return error;
  }
}

export async function patchLike(postId, foreignUserId) {
  const authToken = localStorage.getItem("authToken");

  try {
    if (!authToken) {
      return false;
    }
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
      { foreignUser: foreignUserId },
      {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function deletePost(postId) {
  const authToken = localStorage.getItem("authToken");

  const response = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
    {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    }
  );
  return response;
}

export async function changeIcon(iconUrl) {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const response = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/users/profile/${userId}`,
    { iconUrl: iconUrl },
    {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    }
  );
  return response;
}

export async function deleteComment(postId, id) {
  const authToken = localStorage.getItem("authToken");

  const response = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/comments/${postId}`,
    {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
      data: {
        commentId: id,
      },
    }
  );
  return response;
}

export async function postCamera(camera) {
  const authToken = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/cameras`,
      camera,
      {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function getCamerasByUsername(userId) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/cameras/${userId}`
    );
    return response;
  } catch (error) {
    return error;
  }
}
