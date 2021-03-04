function PopupWithForm(props) {
  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose();
    }
  }

  const submitButtonText = props.isLoading ? props.loadingSubmitText : props.regularSubmitText;

  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button
          className="button button_type_close "
          aria-label="Закрыть"
          onClick={props.onClose}
        />

        <form name={props.name} className="form" noValidate onSubmit={props.onSubmit}>
          <h3 className="form__title">{props.title}</h3>
          {props.children}
          <button className="button button_type_submit" type="submit">
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
