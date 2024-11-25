import { NavLink } from "react-router";
import "./header.scss";

export default function Header() {
  return (
    <header className="header">
      <ul className="header__list">
        <NavLink to={"/"}>
          <li className="header__item">Home</li>
        </NavLink>
        <NavLink to={"/upload"}>
          <li className="header__item">Upload</li>
        </NavLink>
        <li className="header__item">Profile</li>
      </ul>
    </header>
  );
}
