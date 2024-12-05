import "./comment.scss";
import { Link } from "react-router";
import { deleteComment } from "../../utils/handleApi";

export default function Comment({ comment }) {
  const userId = localStorage.getItem("userId");
  console.log(comment);
  async function handleDelete() {
    await deleteComment(comment.post_id, comment.id);
  }

  return (
    <section className="comment">
      <div className="comment__divider">
        {comment.comment && (
          <div className="card__author-container">
            <div className="card__icon-container">
              <img className="icon" src={comment.icon_url} alt="" />
            </div>
            <Link to={`/profile/${comment.user_id}`}>{comment.user_name}</Link>
          </div>
        )}

        <p className="comment__text">
          {comment.comment ? comment.comment : "No one has posted a comment..."}
        </p>
      </div>
      {userId == comment.user_id && (
        <button onClick={handleDelete} className="comment__delete">
          Delete
        </button>
      )}
    </section>
  );
}
