import "./notFound.scss";
import assimilated from "../../assets/icons/Error/assimilated.png";
import busted from "../../assets/icons/Error/busted.png";
import clouded from "../../assets/icons/Error/clouded.png";
import hacked from "../../assets/icons/Error/hacked.png";
import pooped from "../../assets/icons/Error/pooped.png";
import rigged from "../../assets/icons/Error/rigged.png";
import screwed from "../../assets/icons/Error/screwed.png";
import sunk from "../../assets/icons/Error/sunk.png";
import toasted from "../../assets/icons/Error/toasted.png";
import torched from "../../assets/icons/Error/torched.png";
import { useState } from "react";
import { useEffect } from "react";

const images = [
  assimilated,
  busted,
  clouded,
  hacked,
  pooped,
  rigged,
  screwed,
  sunk,
  toasted,
  torched,
];

export default function NotFound() {
  const [randomImage, setRandomImage] = useState();

  const changeImage = () => {
    const randomNumber = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomNumber]);
  };

  useEffect(() => {
    changeImage();
  }, []);

  return (
    <section className="notFound">
      <h1>404 not found</h1>
      <img className="error__icon icon" src={randomImage} alt="" />
    </section>
  );
}
