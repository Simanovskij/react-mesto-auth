import Succes from '../images/Succes.svg';
import notSucces from '../images/notSucces.svg';

function InfoTooltip(props) {
  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose();
    }
  }
  return (
    <div className={props.isOpen ? `popup popup_opened` : `popup`} onClick={handleOverlayClose}>
      <div className="popup__container">
        <button
          className="button button_type_close "
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <img
          className="popup__image"
          src={props.isSuccesRegistration ? Succes : notSucces}
          alt="Иконка регистрации"
        />
        <h2 className="popup__caption">
          {props.isSuccesRegistration
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
