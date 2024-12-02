import "./comment.scss";
import { Link } from "react-router";

export default function Comment({ comment }) {
  return (
    <section className="comment">
      <Link to={`/profile/${comment.user_id}`}>
        <div className="comment__author-container">
          <p className="comment__author">
            {comment.user_name && `${comment.user_name}:`}
          </p>
        </div>
      </Link>
      <p className="comment__text">
        {comment.comment ? comment.comment : "No one has posted a comment..."}
      </p>
    </section>
  );
}
