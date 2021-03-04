import TitleForm from './TitleForm';

function Login({ onLogin }) {
  return <TitleForm title="Вход" submitText="Войти" onSubmit={onLogin}></TitleForm>;
}

export default Login;
