export default function Card(postProp) {
  const post = postProp.post;
  console.log(post.title);
  return (
    <section className="card">
      <div className="card__header-container">
        <h3 className="card__title">{post.title}</h3>
        <h3 className="card__date"></h3>
      </div>
      <div className="card__image-container">
        <img src={post.image_url} alt="" className="card__img" />
      </div>
      <div className="card__details-container">
        <p className="card__likes"></p>
        <p className="card__comments"></p>
        <p className="card__camera"></p>
      </div>
    </section>
  );
}
