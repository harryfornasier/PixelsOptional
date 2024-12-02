import heart from "../../assets/icons/heart.png";
import comment from "../../assets/icons/comment.png";
import axios from "axios";
import { patchLike } from "../../utils/handleApi.jsx";

export default function CardDetails({ post }) {
  async function handleLike() {
    const response = await patchLike(post.id, post.user_id);
    console.log(response);
  }

  return (
    <>
      <div className="card__details-container">
        <button onClick={handleLike} className="card__like-container">
          <img src={heart} className="card__icon icon" alt="" />
          <p className="card__likes">{post.like}</p>
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
