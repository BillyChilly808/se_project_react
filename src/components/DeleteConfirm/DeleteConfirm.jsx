import "./DeleteConfirm.css";
import close from "../../assets/closebutton.svg";

function DeleteConfirm({ activeModal, onClose, handleConfirmDelete }) {
  return (
    <div
      className={`modal ${activeModal === "confirm-delete" && "modal_opened"}`}
    >
      <div className="modal__delete-container">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="closebutton" />
        </button>
        <p className="modal__delete-text">
          Are you sure you want to delete this card? This action is
          irreversible.
        </p>
        <button
          className="modal__delete-yes-button"
          onClick={handleConfirmDelete}
        >
          Yes, delete item
        </button>
        <button className="modal__delete-cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirm;
