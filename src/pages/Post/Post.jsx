import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router";
import { getData, getPost } from "../../utils/handleApi";
import { useState } from "react";
import { useEffect } from "react";
import Comment from "../../components/Comment/Comment";
import "./post.scss";
import { sendComment } from "../../utils/handleApi";
import CardDetails from "../../components/CardDetails/CardDetails";
import { getComments } from "../../utils/handleApi";
import badBart from "../../assets/icons/bad-bart-icon.png";

export default function Post({ loggedIn }) {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");
  const [postComment, setPostComment] = useState("");
  const [error, setError] = useState("");

  function handleComment(event) {
    event.preventDefault();
    if (loggedIn) {
      const comment = {
        postId: id,
        comment: postComment,
      };
      sendComment(comment);
      setData();
    } else {
      setError(`Howdy, you gotta login before you post a comment`);
    }
  }

  async function setData() {
    const response = await getPost(id);
    const commentResponse = await getComments(id);
    setPost(response.data.post[0]);

    if (commentResponse.status === 204) {
      setComments([""]);
    } else {
      setComments(commentResponse.data.comments);
    }
  }

  useEffect(() => {
    setData();
  }, []);

  if (!post) {
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
            <img loading="lazy" className="post__image" src={post.image_url} alt="" />
          </div>
          <CardDetails post={post} />
        </section>
      </div>
      <div className="post__divider">
        <form className="form-comment" action="">
          <label htmlFor="" className="form-comment__label">
            Comment
          </label>
          <div className="form-comment__container">
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
          </div>
          {error && (
            <section className="error">
              <img src={badBart} alt="" />
              <p>{error}</p>
            </section>
          )}
        </form>
        {comments ? (
          comments.map((comment) => {
            return <Comment key={comment.id ? comment.id : 1} comment={comment} />;
          })
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
}
