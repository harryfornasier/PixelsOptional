import heart from "../../assets/icons/heart.png";
import comment from "../../assets/icons/comment.png";

export default function CardDetails({ post }) {
  return (
    <>
      <div className="card__details-container">
        <div className="card__like-container">
          <img src={heart} className="card__icon icon" alt="" />
          <p className="card__likes">{post.like}</p>
        </div>
        <div className="card__comment-container">
          <img src={comment} className="card__icon icon" alt="" />
          <p className="card__comments">{post.comment_count}</p>
        </div>
        <div className="card__camera-container">
          <div className="card__camera-divider">
            <p className="card__camera-text">{post.camera_brand}</p>
            <p className="card__camera-text">{post.camera_model}</p>
          </div>
          <p className="card__camera-year">{post.camera_year}</p>
        </div>
      </div>
    </>
  );
}
