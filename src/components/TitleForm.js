import { useState } from 'react';

function TitleForm({ title, submitText, onSubmit, children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      email,
      password,
    });
    setEmail('');
    setPassword('');
  }

  return (
    <form className="form form_theme_dark" onSubmit={handleSubmit} noValidate>
      <h2 className="form__title form__title_theme_dark">{title}</h2>
      <input
        className="form__input form__input_theme_dark"
        type="email"
        placeholder="Email"
        name="email"
        required
        value={email || ''}
        onChange={handleEmailChange}
      ></input>
      <input
        className="form__input form__input_theme_dark"
        type="password"
        placeholder="Пароль"
        name="password"
        required
        value={password || ''}
        onChange={handlePasswordChange}
      ></input>
      <button className="button button_type_submit button_theme_dark" type="submit">
        {submitText}
      </button>
      {children}
    </form>
  );
}

export default TitleForm;
