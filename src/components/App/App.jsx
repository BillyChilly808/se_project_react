import { useEffect, useState } from "react";
import { coordinates, APIkey } from "../../utils/constants";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItems,
  deleteItems,
  addCardLike,
  removeCardLike,
  updateUserInfo,
  getUserData,
} from "../../utils/api";
import { signin, signup } from "../../utils/auth";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "clouds",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const openRegisterModal = () => {
    setActiveModal("sign-up");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setActiveModal("change-profile");
  };

  const handleSignOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const switchToLoginModal = () => {
    closeActiveModal("");
    setActiveModal("login");
  };

  const switchToSignUpModal = () => {
    closeActiveModal("");
    setActiveModal("sign-up");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = (values) => {
    const token = localStorage.getItem("jwt"); // get token from storage

    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }

    addItems(values, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleTokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      tokenCheck(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  };

  const handleConfirmDelete = (_id) => {
    console.log("Deleting item with _id:", _id);
    deleteItems(_id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id != _id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegisterModalSubmit = ({ email, password, name, avatarUrl }) => {
    signup(email, password, name, avatarUrl)
      .then((data) => {
        console.log(data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignInModalSubmit = ({ email, password }) => {
    signin(email, password)
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", data.token);
        getUserData(data.token).then((UserData) => {
          setCurrentUser(UserData);
          closeActiveModal();
        });
        setIsLoggedIn(true);
      })
      .catch(console.error);
  };

  const handleCardLike = (item) => {
    if (!currentUser) {
      console.log("User not logged in, cannot like item");
      return;
    }

    const token = localStorage.getItem("jwt");
    const isLiked = item.likes.includes(currentUser._id);
    const id = item._id;

    const request = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((card) => (card._id === id ? updatedCard : card))
        );
      })
      .catch((err) => console.log("Like toggle error:", err));
  };
  const handleEditProfileSubmit = (userData) => {
    updateUserInfo(userData, localStorage.getItem("jwt"))
      .then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch((error) => console.log(error));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    getUserData().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        //set the clothing items
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const ProtectedRoute = ({ isloggedIn, children }) => {
    return isloggedIn ? children : <Navigate to="/" />;
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, handleSignOut }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterClick={openRegisterModal}
              handleLoginClick={openLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  // pass clothing items as prop
                  <Main
                    weatherData={weatherData}
                    handleCardLike={handleCardLike}
                    handleDeleteClick={handleDeleteClick}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onSignIn={handleSignInModalSubmit}
                    username={currentUser?.name}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isloggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      username={currentUser?.name}
                      addItems={addItems}
                      deleteClick={handleDeleteClick}
                      handleAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOutClick={handleSignOutClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer></Footer>
          </div>
          <LoginModal
            isOpen={activeModal === "login"}
            onSignIn={handleSignInModalSubmit}
            onClose={closeActiveModal}
            handleRegisterClick={openRegisterModal}
          />
          <AddItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            deleteCard={handleDeleteClick}
          />
          <DeleteConfirm
            activeModal={activeModal}
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            handleConfirmDelete={handleConfirmDelete}
            selectedCard={selectedCard}
          />
          <RegisterModal
            isOpen={activeModal === "sign-up"}
            onClose={closeActiveModal}
            switchToLogin={switchToLoginModal}
            handleRegisterModalSubmit={handleRegisterModalSubmit}
            handleLoginClick={openLoginModal}
          />
          <EditProfileModal
            isOpen={activeModal === "change-profile"}
            onClose={closeActiveModal}
            handleEditProfileSubmit={handleEditProfileSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
