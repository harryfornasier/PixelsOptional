import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router";
import { getPost } from "../../utils/handleApi";
import { useState } from "react";
import { useEffect } from "react";
import Comment from "../../components/Comment/Comment";
import "./post.scss";
import { sendComment } from "../../utils/handleApi";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");
  const [postComment, setPostComment] = useState("");

  function handleComment(event) {
    event.preventDefault();
    const comment = {
      postId: id,
      comment: postComment,
      userId: 1,
    };
    sendComment(comment);
  }

  async function setData() {
    const response = await getPost(id);
    setPost(response.data.post[0]);
    setComments(response.data.post[0].comments);
  }

  useEffect(() => {
    setData();
  }, []);

  if (!post || !comments) {
    return <Loading />;
  }

  return (
    <main className="main">
      <div className="post__border">
        <section className="post">
          <div className="post__title-container">
            <h1 className="post__title">{post.title}</h1>
            <h1 className="post__date">{post.date}</h1>
          </div>
          <div className="post__image-container">
            <img className="post__image" src={post.image_url} alt="" />
          </div>
        </section>
      </div>
      <form className="form-comment" action="">
        <label htmlFor="" className="form-comment__label">
          Comment
        </label>
        <textarea
          type="text"
          className="form-comment__input"
          onChange={(e) => {
            setPostComment(e.target.value);
          }}
        />
        <button onClick={handleComment} className="form-comment__button">
          Post
        </button>
      </form>
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </main>
  );
}
