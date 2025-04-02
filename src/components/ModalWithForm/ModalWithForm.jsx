import "./ModalWithForm.css";
import close from "../../assets/closebutton.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  isDisabled,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="closebutton" />
        </button>
        <form className="modal__form">
          {children}
          <button
            type="submit"
            className={`modal__submit ${
              isDisabled && "modal__submit_disabled"
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
