import React from 'react';
import PopupWithForm from '../components/PopupWithForm';

function EditAvatarPopup(props) {
  const urlRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({ avatar: urlRef.current.value });
    urlRef.current.value = '';
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      regularSubmitText="Сохранить"
      loadingSubmitText="Сохранение..."
      name="avatar"
      title="Обновить аватар"
    >
      <input
        id="edit-avatar"
        name="avatar"
        required
        className="form__input"
        placeholder="Введите ссылку на фото"
        type="url"
        ref={urlRef}
      />
      <span className="form__error" id="edit-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
