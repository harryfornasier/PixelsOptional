export default function Comment({ comment }) {
  return (
    <section className="comment">
      <h2 className="comment__text">{comment.comment}</h2>
    </section>
  );
}
