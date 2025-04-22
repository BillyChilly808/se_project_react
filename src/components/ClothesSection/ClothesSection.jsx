import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleAddClick, onCardClick, clothingItems }) {
  return (
    <div className="clothes-section__items">
      <p className="clothes-section__header">Your Items</p>
      <button onClick={handleAddClick} className="clothes-section__add-button">
        + Add New
      </button>
      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
