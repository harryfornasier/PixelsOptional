import { useParams } from "react-router";
import { getPost } from "../../utils/handleApi";
import { useState } from "react";
import { useEffect } from "react";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    (async () => {
      const post = await getPost(id);
      setPost(post.data.post.post[0]);
    })();
  }, []);

  return (
    <section className="post">
      <div className="post__title-container">
        <h1 className="post__title">{post.title}</h1>
        <h1 className="post__date">{post.date}</h1>
      </div>
      <div className="post__image-container">
        <img src={post.image_url} alt="" />
      </div>
    </section>
  );
}
