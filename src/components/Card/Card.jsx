import { Link } from "react-router";
import "./card.scss";
import Lines from "../Lines/Lines";
import heart from "../../assets/icons/heart.png";
import comment from "../../assets/icons/comment.png";

export default function Card(postProp) {
  const timeStampPattern = /(\d{4})-(\d{2})-(\d{2})T.*$/;
  const post = postProp.post;
  return (
    <div className="card__border">
      <section className="card">
        <div className="card__header-container">
          <h3 className="card__title">{post.title}</h3>
          <Lines />
          <h3 className="card__date">
            {post.created_at.replace(timeStampPattern, "$3/$2/$1")}
          </h3>
        </div>

        <div className="card__image-container">
          <Link to={`/post/${post.id}`}>
            <img src={post.image_url} alt="" className="card__img" />
          </Link>
        </div>

        <div className="card__details-container">
          <div className="card__like-container">
            <img src={heart} width="20x" height="20px" alt="" />
            <p className="card__likes">{post.like}</p>
          </div>
          <div className="card__comment-container">
            <img src={comment} width="20px" height="20px" alt="" />
            <p className="card__comments">{post.comment_count}</p>
          </div>
          <div className="card__camera-container">
            <div className="card__camera-divider">
              <p className="card__camera-text">{post.camera_brand}</p>
              <p className="card__camera-text">{post.camera_model}</p>
            </div>
            <p className="card__camera-year">{post.camera_year}</p>
          </div>

          <p className="card__camera"></p>
        </div>
      </section>
    </div>
  );
}
