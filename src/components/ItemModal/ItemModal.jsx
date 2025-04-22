import "./ItemModal.css";
import close from "../../assets/closebutton.svg";

function ItemModal({ activeModal, onClose, card, deleteCard }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="closebutton" />
        </button>
        <img src={card.imageUrl} alt="modal image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button onClick={deleteCard} className="modal__delete">
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
