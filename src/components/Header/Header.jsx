import { NavLink } from "react-router";
import "./header.scss";
import home from "../../assets/icons/home.png";
import upload from "../../assets/icons/upload.png";
import profile from "../../assets/icons/profile.png";

export default function Header(loggedIn) {
  return (
    <>
      <header className="header">
        <h1 className="header__title">PixelsOptional</h1>
        <ul className="header__list">
          <NavLink to={"/1"}>
            <div className="header__container">
              <img src={home} alt="" className="header__icon icon" />
              <li className="header__item">Home</li>
            </div>
          </NavLink>
          <NavLink to={"/upload"}>
            <div className="header__container">
              <img src={upload} alt="" className="header__icon icon" />
            </div>
            <li className="header__item">Upload</li>
          </NavLink>
          {!loggedIn ? (
            <NavLink to={"/users/login"}>
              <div className="header__container">
                <img src={profile} alt="" className="header__icon icon" />
                <li className="header__item">Login</li>
              </div>
            </NavLink>
          ) : (
            <NavLink to={"/profile"}>
              <div className="header__container">
                <img src={profile} alt="" className="header__icon icon" />
                <li className="header__item">Profile</li>
              </div>
            </NavLink>
          )}

          {!loggedIn && (
            <NavLink to={"/users/register"}>
              <div className="header__container">
                <img src={profile} alt="" className="header__icon icon" />
                <li className="header__item">Register</li>
              </div>
            </NavLink>
          )}
        </ul>
      </header>
    </>
  );
}
