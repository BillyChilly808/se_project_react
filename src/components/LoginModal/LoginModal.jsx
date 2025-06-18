import { useState } from "react";
import "./LoginModal.css";
import close from "../../assets/closebutton.svg";

function LoginModal({ isOpen, onClose, onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
        <h2 className="modal__title">Log in</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">Email</label>
          <input
            type="email"
            className="modal__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="modal__label">Password</label>
          <input
            type="password"
            className="modal__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="modal__submit"
            disabled={!email || !password}
          >
            Log in
          </button>
        </form>
        <p className="modal__switch">
          or{" "}
          <span className="modal__switch-link" onClick={switchToRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
