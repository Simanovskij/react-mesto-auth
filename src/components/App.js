import React from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import auth from '../utils/auth';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitPopup from './SubmitPopup';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = React.useState(false);
  const [isPopupImageOpen, setIsPopupImageOpen] = React.useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [isLoading, setIsloading] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccesRegistration, setisSuccesRegistration] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    api.getInitialData().then(
      (res) => {
        const [user, cards] = res;
        setCurrentUser(user);
        setCards(cards);
      },
      (err) => console.log(err)
    );
  }, []);

  React.useEffect(() => {
    const onKeypress = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card, isLiked).then(
      (newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      },
      (err) => console.log(err)
    );
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsloading(true);
    api
      .delCard(deletedCard)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== deletedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsloading(false);
      });
  }

  function handleSetCardForDelete(card) {
    setDeletedCard(card);
    setIsSubmitPopupOpen(true);
  }

  const handleCardClick = (name, link) => {
    setSelectedCard({
      name: name,
      link: link,
    });
    setIsPopupImageOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setIsPopupImageOpen(false);
    setisInfoTooltipOpen(false);
  };

  function handleUpdateUser(data) {
    setIsloading(true);
    api
      .setUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsloading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsloading(true);
    api
      .setAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsloading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsloading(true);
    api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsloading(false);
      });
  }

  function onRegister(data) {
    auth
      .register(data)
      .then(() => {
        history.push('./sign-in');
        setisInfoTooltipOpen(true);
        setisSuccesRegistration(true);
      })
      .catch((err) => {
        console.log(err);
        setisSuccesRegistration(false);
        setisInfoTooltipOpen(true);
      });
  }

  function onLogin(data) {
    auth
      .login(data)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        checkToken();
        history.push('/');
      })
      .catch((err) => console.log(err));
  }

  const checkToken = React.useCallback(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  function onSignOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setIsLoggedIn(false);
    setEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={email} onSignOut={onSignOut} isLoggedIn={isLoggedIn} />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <ProtectedRoute
              path="/"
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleSetCardForDelete}
              cards={cards}
              component={Main}
              isLoggedIn={isLoggedIn}
            />
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <SubmitPopup
            isOpen={isSubmitPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isPopupImageOpen} />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isSuccesRegistration={isSuccesRegistration}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
