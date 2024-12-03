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
import { deletePost } from "../../utils/handleApi";

export default function Post({ loggedIn }) {
  const timeStampPattern = /(\d{4})-(\d{2})-(\d{2})T.*$/;
  const admin = localStorage.getItem("admin");
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
      setComments();
    } else {
      setError(`Howdy, you gotta login before you post a comment`);
    }
  }

  async function handleCommentApi() {
    const commentResponse = await getComments(id);

    console.log(commentResponse);

    //Checks if no one has posted a comment
    //Set Comment to an empty string within an array so map does not fail
    //In comments component "no comment" message is
    if (commentResponse.status === 204) {
      setComments([""]);
    } else {
      setComments(commentResponse.data.comments);
    }
  }

  async function hanldePostApi() {
    const response = await getPost(id);
    setPost(response.data.post[0]);
  }

  async function handleDelete() {
    const response = await deletePost(id);
    console.log(response);
  }

  useEffect(() => {
    hanldePostApi();
    handleCommentApi();
  }, []);

  if (!post) {
    return <Loading />;
  }

  return (
    <main className="main">
      <div
        className={
          post.landscape ? "post__border" : "post__border post__border--portrait"
        }
      >
        <section className="post">
          <div className="post__title-container">
            <h1 className="post__title">{post.title}</h1>
            <h3 className="post__date">
              {post.created_at.replace(timeStampPattern, "$3/$2/$1")}
            </h3>
          </div>
          {admin == 1 && <button onClick={handleDelete}>Delete</button>}
          <div className="post__image-container">
            <img
              loading="lazy"
              className={
                post.landscape ? "post__image" : "post__image post__image--portrait"
              }
              src={post.image_url}
              alt=""
            />
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
