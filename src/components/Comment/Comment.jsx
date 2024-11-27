import "./comment.scss";

export default function Comment({ comment }) {
  return (
    <section className="comment">
      <p className="comment__text">
        {comment.text ? comment.text : "No one has posted a comment..."}
      </p>
    </section>
  );
}
