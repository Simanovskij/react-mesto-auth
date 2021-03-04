import TitleForm from './TitleForm';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  return (
    <TitleForm title="Регистрация" submitText="Зарегистрироваться" onSubmit={onRegister}>
      <p className="form__login-paragraph">
        Уже зарегистрированы?{' '}
        <Link className="form__login-link" to="./sign-in">
          Войти
        </Link>
      </p>
    </TitleForm>
  );
}

export default Register;
