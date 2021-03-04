import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      regularSubmitText="Сохранить"
      loadingSubmitText="Сохранение..."
      name="edit"
      title="Редактировать профиль"
    >
      <input
        id="name"
        name="name"
        required
        className="form__input"
        type="text"
        minLength={2}
        maxLength={40}
        placeholder="Имя"
        onChange={handleChangeName}
        value={name || ''}
      />
      <span className="form__error" id="name-error" />
      <input
        id="feature"
        name="feature"
        required
        className="form__input"
        type="text"
        minLength={2}
        maxLength={200}
        placeholder="Занятие"
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className="form__error" id="feature-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
