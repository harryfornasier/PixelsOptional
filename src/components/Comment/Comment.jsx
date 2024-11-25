import "./comment.scss";

export default function Comment({ comment }) {
  console.log(comment);
  return (
    <section className="comment">
      <p className="comment__text">{comment.text}</p>
    </section>
  );
}
