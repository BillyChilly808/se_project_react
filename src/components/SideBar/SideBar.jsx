import "./SideBar.css";
import avatar from "../../assets/Avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} className="sidebar__avatar" alt="Default Avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
