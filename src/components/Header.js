import logo from '../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {
  const currentLocation = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {currentLocation.pathname === '/sign-in' && (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      )}
      {currentLocation.pathname === '/sign-up' && (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}
      {props.isLoggedIn && (
        <div className="header__user-info">
          <p className="header__user-email">{props.email}</p>
          <button className="header__signout-link" onClick={props.onSignOut}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
