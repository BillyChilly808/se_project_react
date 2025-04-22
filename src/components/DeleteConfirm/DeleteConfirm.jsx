import "./DeleteConfirm.css";
import close from "../../assets/closebutton.svg";

function DeleteConfirm({ activeModal, onClose, handleConfirmDelete }) {
  return (
    <div
      className={`modal ${activeModal === "confirm-delete" && "modal_opened"}`}
    >
      <p>Are you sure you want to delete this card?</p>
      <button onClick={handleConfirmDelete}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
}

export default DeleteConfirm;
