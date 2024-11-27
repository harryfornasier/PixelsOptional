import "./comment.scss";

export default function Comment({ comment }) {
  return (
    <section className="comment">
      <div className="comment__author-container">
        <p className="comment__author">{comment.user_name && `${comment.user_name}:`}</p>
      </div>
      <p className="comment__text">
        {comment.comment ? comment.comment : "No one has posted a comment..."}
      </p>
    </section>
  );
}
