import "./about.scss";

export default function About() {
  return (
    <section className="about">
      <h1 className="about__title">About</h1>
      <h2 className="about__subheading">General Questions</h2>
      <h3 className="about__subtitle">Who is this website for?</h3>
      <p className="about__text">
        This website is for people with a love of retro cameras.
      </p>
      <h3 className="about__subtitle">Retro cameras as in film?</h3>
      <p className="about__text">Nope, you can use digital cameras as well</p>
      <h3 className="about__subtitle">
        How old does a digital camera have to be to be "retro"?
      </h3>
      <p className="about__text">
        I'll leave this up for you to decide. But my feeling is that around 2005 is the
        cut-off.
      </p>
      <h3 className="about__subtitle">So I can just use a new camera?</h3>
      <p className="about__text">
        There's nothing to stop you from doing it but it does go against the purpose of
        the website.
      </p>
      <h2 className="about__subheading">User questions</h2>
      <h3 className="about__subtitle">What is this pot thing in my profile?</h3>
      <p className="about__text">
        This is an idea I came up with to make likes more interesting. The idea is you can
        only like an image if you have likes to give in your pot. So when you like an
        image your pot decreases.
      </p>
      <h3 className="about__subtitle">So I can run out of likes?</h3>
      <p className="about__text">
        No, when you recieve likes you gain another like to give in your pot.
      </p>
      <h3 className="about__subtitle">How about my recieved likes can that go down?</h3>
      <p className="about__text">
        No, that can only go up and is what is visible to other users
      </p>
      <h3 className="about__subtitle">Can I like my own photos?</h3>
      <p className="about__text">No</p>
      <h2 className="about__subheading">Upload questions</h2>
      <h3 className="about__subtitle">Is there a file limit?</h3>
      <p className="about__text">
        Yes it's set to 4.5mb. If your image is over this then I'd recommend using
        something like ImageOptim on the mac to compress it.
      </p>
      <h2 className="about__subheading">Design questions</h2>
      <h3 className="about__subtitle">
        Where did you get inspiration from for the design of the wesbite?
      </h3>
      <p className="about__text">
        I'm a big fan of old Macintosh computers. A lot of the design ideas were copied
        from there
      </p>
      <h3 className="about__subtitle">The icons are so cool did you make them?</h3>
      <p className="about__text">
        No, but I think they're very cool too. They were made by Etherbrian, aka Brian
        Brasher in the late 90s for Macintosh computer icons. Check out his website here:
        <a href="https://etherbrian.github.io/index.html"> etherbrian</a>
      </p>
    </section>
  );
}
