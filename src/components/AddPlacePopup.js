import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      regularSubmitText="Добавить"
      loadingSubmitText="Добавление..."
    >
      <input
        id="place-name"
        name="name"
        required
        className="form__input"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChangeName}
      />
      <span className="form__error" id="place-name-error"></span>
      <input
        id="place-link"
        name="link"
        required
        className="form__input"
        placeholder="Ссылка на картинку"
        type="url"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="form__error" id="place-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
