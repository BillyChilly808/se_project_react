import { Link } from "react-router-dom";

import "./Header.css";
import { useContext } from "react";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Header-logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__user-container">
            <Link to="/profile" className="header__link"></Link>
            <button
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
            <p className="header__username">{currentUser?.name}</p>
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="header__avatar"
            />
          </div>
        ) : (
          <div className="header__auth-container">
            <button
              className="header__register-btn"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__login-btn"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
