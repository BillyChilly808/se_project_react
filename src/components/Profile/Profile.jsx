import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar></SideBar>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection onCardClick={onCardClick}></ClothesSection>
      </section>
    </div>
  );
}

export default Profile;
