import { Link, generatePath } from 'react-router-dom';
import {AppRoute} from '../../../const';
import {fetchReviews, fetchSelectedProduct} from '../../../store/api-actions';
import {useAppDispatch} from '../../../hooks/index';
import useModal from '../../../hooks/useModal';
import FocusLock from 'react-focus-lock';


type SuccessModalProps = {
  cameraId?: number;
  onCloseClick: () => void;
}

function SuccessModal ({cameraId, onCloseClick}: SuccessModalProps): JSX.Element {

  const dispatch = useAppDispatch();

  const handleCloseSuccessModal = () => {

    if(cameraId) {
      dispatch(fetchReviews(cameraId));
      dispatch(fetchSelectedProduct(cameraId));
    }
    onCloseClick();
  };

  useModal(handleCloseSuccessModal);

  return (
    <FocusLock>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={(evt) => (evt.currentTarget === evt.target) && handleCloseSuccessModal()}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              {cameraId &&
            <Link className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleCloseSuccessModal} to={generatePath(AppRoute.Product, {id: `${cameraId}`})}>Вернуться к покупкам
            </Link>}
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseClick}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusLock>

  );
}

export default SuccessModal;
