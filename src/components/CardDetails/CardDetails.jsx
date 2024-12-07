import heart from "../../assets/icons/heart.png";
import comment from "../../assets/icons/comment.png";
import { patchLike } from "../../utils/handleApi.jsx";

export default function CardDetails({ post, fetchPosts, setError, handlePostApi }) {
  const loggedUser = localStorage.getItem("userId");

  async function handleLike() {
    let postId = 1;

    if (post.id) {
      postId = post.id;
    } else {
      postId = post.post_id;
    }

    const response = await patchLike(postId, post.user_id);

    if (response) {
      if (fetchPosts) {
        fetchPosts();
      } else {
        handlePostApi();
      }
    } else {
      if (setError) {
        setError("You ain't logged in");
      }
    }
  }
  return (
    <>
      <div className="card__details-container">
        <button
          onClick={handleLike}
          disabled={post.user_id == loggedUser || !loggedUser}
          className={
            post.user_liked
              ? "card__like-container card__like-container--active"
              : "card__like-container"
          }
        >
          <img src={heart} className="card__icon icon" alt="" />
          <p className="card__likes">{post.like_count}</p>
        </button>
        <div className="card__comment-container">
          <img src={comment} className="card__icon icon" alt="" />
          <p className="card__comments">{post.comment_count}</p>
        </div>

        <div className="card__camera-container">
          <div className="card__camera-divider">
            <p className="card__camera-text">
              {post.camera_brand ? post.camera_brand : post.camera}
            </p>
            <p className="card__camera-text">{post.camera_model}</p>
          </div>
          <p className="card__camera-year">{post.camera_year}</p>
        </div>
      </div>
    </>
  );
}
