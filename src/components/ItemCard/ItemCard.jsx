import "./ItemCard.css";
import likeHeart from "../../assets/heart.svg";
import noLikeHeart from "../../assets/no-like-heart.svg";

function ItemCard({ item, onCardClick, handleCardLike, currentUser }) {
  // Check if current user liked this item
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button
        className="card__like-btn"
        type="button"
        onClick={() => handleCardLike(item)}
      >
        <img
          src={isLiked ? likeHeart : noLikeHeart}
          alt={isLiked ? "Unlike item" : "Like item"}
          className="card__like-icon"
        />
      </button>
    </li>
  );
}

export default ItemCard;
