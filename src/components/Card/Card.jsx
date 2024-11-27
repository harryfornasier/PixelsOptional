import { Link } from "react-router";
import "./card.scss";
import Lines from "../Lines/Lines";
import CardDetails from "../CardDetails/CardDetails";

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
        <div className="card__author-container">
          <Link to={`/profile/${post.user_id}`}>
            <img src="" alt="" />
            <p className="card__author">{post.name}</p>
          </Link>
        </div>
        <CardDetails post={post} />
      </section>
    </div>
  );
}
