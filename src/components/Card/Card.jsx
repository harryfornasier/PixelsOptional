import { Link } from "react-router";
import "./card.scss";
import Lines from "../Lines/Lines";

export default function Card(postProp) {
  const post = postProp.post;
  return (
    <section className="card">
      <div className="card__header-container">
        <Lines />
        <h3 className="card__title">{post.title}</h3>
        <Lines />
        <h3 className="card__date"></h3>
      </div>

      <Link to={`/post/${post.id}`}>
        <img src={post.image_url} alt="" className="card__img" />
      </Link>

      <div className="card__details-container">
        <p className="card__likes"></p>
        <p className="card__comments"></p>
        <p className="card__camera"></p>
      </div>
    </section>
  );
}
