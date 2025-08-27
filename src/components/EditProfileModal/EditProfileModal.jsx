import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  onClose,
  isOpen,
  handleEditProfileSubmit,
}) {
  const user = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setAvatarUrl(user?.avatar || "");
  }, [isOpen, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfileSubmit({ name, avatar: avatarUrl });
  };

  return (
    <ModalWithForm
      title="Change profile"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="editname"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
      </label>
      <label className="modal__label">
        Avatar{" "}
        <input
          type="text"
          className="modal__input"
          id="editavatarUrl"
          placeholder="Avatar URL"
          onChange={(e) => {
            setAvatarUrl(e.target.value);
          }}
          value={avatarUrl}
          required
        />
      </label>
      <button
        type="submit"
        className="modal__submit"
        disabled={!name || !avatarUrl}
      >
        Save Changes
      </button>
    </ModalWithForm>
  );
}
