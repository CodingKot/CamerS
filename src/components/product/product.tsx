import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, MouseEvent} from 'react';
import { fetchReviews, fetchSimilars, fetchSelectedProduct } from '../../store/api-actions';
import {Link, useParams} from 'react-router-dom';
import CameraCard from '../camera_card/camera_card';
import {getSelectedProduct, getSortedReviews, getSimilars} from '../../store/selectors';
import Rating from '../rating/rating';
import ReviewCard from '../review-card/review-card';
import { useState } from 'react';
import classnames from 'classnames';
import { REVIEWS_PER_STEP, FIRST_ACTIVE_SIMILARS } from '../../const';
import { handleScrollToTop } from '../../utils/utils';
import ReviewSendModal from './review-send-modal/review-send-modal';
import SuccessModal from './success-modal/success-modal';
import Breadcrumps from '../breadcrumps/breadcrumps';


function Product (): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const selectedProduct = useAppSelector(getSelectedProduct(Number(params.id)));
  const reviews = useAppSelector(getSortedReviews);
  const reviewsCount = reviews.length;
  const similars = useAppSelector(getSimilars);
  const [isActiveProperties, setActiveProperties] = useState<boolean>(false);
  const [isActiveDescription, setActiveDescription] = useState<boolean>(true);
  const [reviewsRendered, setReviewsRendered] = useState<number>(REVIEWS_PER_STEP);
  const [activeSimilars, setActiveSimilars] = useState<number[]>(FIRST_ACTIVE_SIMILARS);
  const [nextClickCounter, setNextClickCounter] = useState<number>(FIRST_ACTIVE_SIMILARS.length);
  const [isReviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [isSuccessModalopen, setSuccessModalOpen] = useState<boolean>(false);

  const handleTabButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setActiveProperties(!isActiveProperties);
    setActiveDescription(!isActiveDescription);
  };

  const handleShowMoreButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setReviewsRendered (Math.min(reviewsCount, reviewsRendered + REVIEWS_PER_STEP));
  };

  const handleNextButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setActiveSimilars(activeSimilars.map((item) => item + 1));
    setNextClickCounter(nextClickCounter + 1);
  };

  const handlePreviousButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setActiveSimilars(activeSimilars.map((item) => item - 1));
    setNextClickCounter(nextClickCounter - 1);
  };


  const handleSendReviewOpen = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setReviewModalOpen(true);
  };


  const handleSendReviewClose = () => {
    setReviewModalOpen(false);
  };

  const handleSuccessModalOpen = () => {
    setSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };


  const renderReviews = reviews.slice(0, Math.min(reviewsCount, reviewsRendered)).map((review) => (
    <ReviewCard review={review} key={review.id}/>
  ));

  useEffect(() => {
    if(!selectedProduct?.id){
      dispatch(fetchSelectedProduct(Number(params.id)));
    }
    dispatch(fetchReviews(Number(params.id)));
    dispatch(fetchSimilars(Number(params.id)));
    setReviewsRendered(REVIEWS_PER_STEP);
    setActiveSimilars(FIRST_ACTIVE_SIMILARS);
    setNextClickCounter(FIRST_ACTIVE_SIMILARS.length);
  }, [selectedProduct?.id, params.id, dispatch]);

  return (

    <main>
      <div className="page-content">
        <Breadcrumps/>
        <div className="page-content__section">
          <section className="product">
            <div className="container">
              <div className="product__img">
                {selectedProduct &&
                <picture>
                  <source type="image/webp" srcSet={`${selectedProduct.previewImgWebp}, ${selectedProduct.previewImg2x} 2x`}/><img src={selectedProduct.previewImg} srcSet={`${selectedProduct.previewImg2x} 2x`} width="560" height="480" alt={selectedProduct.name}/>
                </picture>}
              </div>
              <div className="product__content">
                <h1 className="title title--h3">{selectedProduct?.name}</h1>
                {selectedProduct && <Rating rating={selectedProduct?.rating} reviewCount={selectedProduct?.reviewCount} className='product__rate'/>}
                <p className="product__price"><span className="visually-hidden">Цена:</span>{selectedProduct?.price.toLocaleString()} ₽</p>
                <button className="btn btn--purple" type="button">
                  <svg width="24" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-add-basket"></use>
                  </svg>Добавить в корзину
                </button>
                <div className="tabs product__tabs">
                  <div className="tabs__controls product__tabs-controls">
                    <button className={classnames('tabs__control', {'is-active': isActiveProperties})} type="button"
                      onClick={handleTabButtonClick}
                    >
                    Характеристики
                    </button>
                    <button className={classnames('tabs__control', {'is-active': isActiveDescription})} type="button"
                      onClick={handleTabButtonClick}
                    >Описание
                    </button>
                  </div>
                  <div className="tabs__content">
                    <div className={classnames('tabs__element', {'is-active': isActiveProperties})}>
                      <ul className="product__tabs-list">
                        <li className="item-list"><span className="item-list__title">Артикул:</span>
                          <p className="item-list__text"> {selectedProduct?.vendorCode}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Категория:</span>
                          <p className="item-list__text">{selectedProduct?.category}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                          <p className="item-list__text">{selectedProduct?.type}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Уровень:</span>
                          <p className="item-list__text">{selectedProduct?.level}</p>
                        </li>
                      </ul>
                    </div>
                    <div className={classnames('tabs__element', {'is-active': isActiveDescription})}>
                      <div className="product__tabs-text">
                        <p>{selectedProduct?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>
        {similars.length !== 0 &&
<div className="page-content__section">
  <section className="product-similar">
    <div className="container">
      <h2 className="title title--h3">Похожие товары</h2>
      <div className="product-similar__slider">
        <div className="product-similar__slider-list">
          {selectedProduct && similars.map((similar, index) => (
            <CameraCard key={`camera-${similar.id}`} camera={similar} activeClassName={classnames({'is-active': activeSimilars.includes(index)})}/>
          ))}
        </div>
        <button className={classnames('slider-controls', 'slider-controls--prev',
          {'visually-hidden': FIRST_ACTIVE_SIMILARS.length >= similars.length ||
          nextClickCounter <= FIRST_ACTIVE_SIMILARS.length})}
        type="button" aria-label="Предыдущий слайд"
        onClick={handlePreviousButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <button className={classnames('slider-controls', 'slider-controls--next', {'visually-hidden': FIRST_ACTIVE_SIMILARS.length >= similars.length ||
        nextClickCounter >= similars.length})}
        type="button" aria-label="Следующий слайд"
        onClick={handleNextButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
    </div>
  </section>
</div>}
        <div className="page-content__section">
          <section className="review-block">
            <div className="container">
              <div className="page-content__headed">
                <h2 className="title title--h3">Отзывы</h2>
                <button className="btn" type="button" onClick={handleSendReviewOpen}>Оставить свой отзыв</button>
              </div>
              <ul className="review-block__list">
                {renderReviews}
              </ul>
              <div className={classnames('review-block__buttons', {'visually-hidden':
              reviewsCount <= reviewsRendered})}
              >
                <button className="btn btn--purple" type="button" onClick={handleShowMoreButtonClick}>Показать больше отзывов
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Link className="up-btn" to="#header" onClick={handleScrollToTop}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </Link>
      {isReviewModalOpen && <ReviewSendModal onCloseClick={handleSendReviewClose} onSuccess={handleSuccessModalOpen} cameraId={selectedProduct?.id}/>}
      {isSuccessModalopen && <SuccessModal cameraId={selectedProduct?.id} onCloseClick={handleSuccessModalClose}/>}
    </main>

  );
}

export default Product;
