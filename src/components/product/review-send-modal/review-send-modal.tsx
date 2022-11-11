import React, {ChangeEvent, useState, FormEvent} from 'react';
import {RATING_MARKS} from '../../../const';
import {postReview} from '../../../store/api-actions';
import {useAppDispatch} from '../../../hooks/index';
import { unwrapResult } from '@reduxjs/toolkit';
import useModal from '../../../hooks/useModal';
import FocusLock from 'react-focus-lock';
import classnames from 'classnames';


type ReviewSendModalProps = {
  onCloseClick: () => void;
  onSuccess: () => void;
  cameraId?: number;
}

function ReviewSendModal({onCloseClick, onSuccess, cameraId}: ReviewSendModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string>('');
  const [advantage, setAdvantage] = useState<string>('');
  const [disadvantage, setDisadvantage] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [isInvalidRating, setIsInvalidRating] = useState<boolean>(false);
  const [isInvalidName, setIsInvalidName] = useState<boolean>(false);
  const [isInvalidAdvantage, setIsInvalidAdvantage] = useState<boolean>(false);
  const [isInvalidDisadvantage, setIsInvalidDisadvantage] = useState<boolean>(false);
  const [isInvalidReview, setIsInvalidReview] = useState<boolean>(false);

  const checkValidity = () => {
    rating === undefined ? setIsInvalidRating(true) : setIsInvalidRating(false);
    userName === '' ? setIsInvalidName(true) : setIsInvalidName(false);
    advantage === '' ? setIsInvalidAdvantage(true) : setIsInvalidAdvantage(false);
    disadvantage === '' ? setIsInvalidDisadvantage(true) : setIsInvalidDisadvantage(false);
    review === '' ? setIsInvalidReview(true) : setIsInvalidReview(false);
    return rating !== undefined && userName !== '' && advantage !== '' && disadvantage !== '' && review !== '';
  };

  const handleReviewSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isFormValid = checkValidity();
    if(isFormValid) {
      dispatch(postReview({cameraId, userName, advantage, disadvantage, review, rating}))
        .then(unwrapResult)
        .then(() => {
          onCloseClick();
          onSuccess();
        });
    }
  };

  const handleRatingChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(target.value));
  };

  const handleUserNameChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setUserName(target.value);
  };

  const handleAdvantageChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setAdvantage(target.value);
  };

  const handleDisadvantageChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setDisadvantage(target.value);
  };

  const handleReviewChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(target.value);
  };

  useModal(onCloseClick);

  return (
    <FocusLock>
      <div className="modal is-active" >
        <div className="modal__wrapper" >
          <div className="modal__overlay" onClick={(evt) => (evt.currentTarget === evt.target) && onCloseClick()}></div>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form method="post" action='#' onSubmit={handleReviewSubmit}>
                <div className="form-review__rate">
                  <fieldset className={classnames('rate form-review__item', 'form-review__item', {'is-invalid': isInvalidRating})}>
                    <legend className="rate__caption">Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        {RATING_MARKS.map((mark) => (
                          <React.Fragment key={`${mark.mark} - rating`}>
                            <input className="visually-hidden" id={`star-${mark.mark}`} name="rate" type="radio" value={mark.mark} onChange={handleRatingChange}/>
                            <label className="rate__label" htmlFor={`star-${mark.mark}`} title={mark.emotion}></label>
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">Нужно оценить товар</p>
                  </fieldset>
                  <div className={classnames('custom-input', 'form-review__item', {'is-invalid': isInvalidName})}>
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>

                      </span>
                      <input type="text" name="user-name" placeholder="Введите ваше имя" value={userName} onChange={handleUserNameChange} data-testid="name"/>
                    </label>
                    <p className="custom-input__error">Нужно указать имя</p>
                  </div>
                  <div className={classnames('custom-input', 'form-review__item', {'is-invalid': isInvalidAdvantage})}>
                    <label>
                      <span className="custom-input__label">Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" name="user-plus" placeholder="Основные преимущества товара" value={advantage} onChange={handleAdvantageChange} data-testid="advantage"/>
                    </label>
                    <p className="custom-input__error">Нужно указать достоинства</p>
                  </div>
                  <div className={classnames('custom-input', 'form-review__item', {'is-invalid': isInvalidDisadvantage})}>
                    <label>
                      <span className="custom-input__label">Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" name="user-minus" placeholder="Главные недостатки товара" value={disadvantage} onChange={handleDisadvantageChange} data-testid="disadvantage"/>
                    </label>
                    <p className="custom-input__error">Нужно указать недостатки</p>
                  </div>
                  <div className={classnames('custom-textarea', 'form-review__item', {'is-invalid': isInvalidReview})}>
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea name="user-comment" minLength={5} placeholder="Поделитесь своим опытом покупки" value={review} onChange={handleReviewChange} data-testid="review"></textarea>
                    </label>
                    <div className="custom-textarea__error">Нужно добавить комментарий</div>
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
              </form>

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

export default ReviewSendModal;


