import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, MouseEvent} from 'react';
import { fetchReviews, fetchSimilars, fetchSelectedProduct } from '../../store/api-actions';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import CameraCard from '../camera-card/camera-card';
import {getSelectedProduct, getSortedReviews, getSimilars} from '../../store/selectors';
import Rating from '../rating/rating';
import ReviewCard from '../review-card/review-card';
import { useState } from 'react';
import classnames from 'classnames';
import { REVIEWS_PER_STEP, FIRST_ACTIVE_SIMILARS } from '../../const';
import { handleScrollToTop } from '../../utils/utils';
import ReviewSendModal from './review-send-modal/review-send-modal';
import SuccessModal from './success-modal/success-modal';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { TAB_CONTROLS, TabControl, Query } from '../../const';


function Product (): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get(Query.Tab);
  const selectedProduct = useAppSelector(getSelectedProduct(Number(id)));
  const reviews = useAppSelector(getSortedReviews);
  const reviewsCount = reviews.length;
  const similars = useAppSelector(getSimilars);
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const [reviewsRendered, setReviewsRendered] = useState(REVIEWS_PER_STEP);
  const [activeSimilars, setActiveSimilars] = useState<number[]>(FIRST_ACTIVE_SIMILARS);
  const [nextClickCounter, setNextClickCounter] = useState(FIRST_ACTIVE_SIMILARS.length);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);


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
      dispatch(fetchSelectedProduct(Number(id)));
    }
    dispatch(fetchReviews(Number(id)));
    dispatch(fetchSimilars(Number(id)));
    setReviewsRendered(REVIEWS_PER_STEP);
    setActiveSimilars(FIRST_ACTIVE_SIMILARS);
    setNextClickCounter(FIRST_ACTIVE_SIMILARS.length);
  }, [selectedProduct?.id, id, dispatch]);

  return (

    <main>
      <div className="page-content" >
        <Breadcrumbs title={selectedProduct?.name}/>
        <div className="page-content__section">
          <section className="product">
            <div className="container">
              <div className="product__img">
                {selectedProduct &&
                <picture>
                  <source type="image/webp" srcSet={`/${selectedProduct.previewImgWebp}, /${selectedProduct.previewImg2x} 2x`}/><img src={`/${selectedProduct.previewImg}`} srcSet={`/${selectedProduct.previewImg2x} 2x`} width="560" height="480" alt={selectedProduct.name}/>
                </picture>}
              </div>
              <div className="product__content">
                <h1 className="title title--h3">{selectedProduct?.name}</h1>
                {selectedProduct && <Rating rating={selectedProduct?.rating} reviewCount={selectedProduct?.reviewCount} className='product__rate'/>}
                <p className="product__price"><span className="visually-hidden">????????:</span>{selectedProduct?.price.toLocaleString()} ???</p>
                <button className="btn btn--purple" type="button">
                  <svg width="24" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-add-basket"></use>
                  </svg>???????????????? ?? ??????????????
                </button>
                <div className="tabs product__tabs">
                  <div className="tabs__controls product__tabs-controls">
                    {TAB_CONTROLS.map((control) => (
                      <button key={control.value} className={classnames('tabs__control', {'is-active': control.value === selectedTab})} type="button"
                        onClick={(evt) => {
                          evt.preventDefault();
                          setSearchParams(`?${Query.Tab}=${control.value}`);
                          setSelectedTab(control.value);
                        }}
                      >
                        {control.label}
                      </button>
                    ))}
                  </div>
                  <div className="tabs__content">
                    {selectedTab === TabControl.Features &&
                    <div className="tabs__element is-active">
                      <ul className="product__tabs-list">
                        <li className="item-list"><span className="item-list__title">??????????????:</span>
                          <p className="item-list__text"> {selectedProduct?.vendorCode}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">??????????????????:</span>
                          <p className="item-list__text">{selectedProduct?.category}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">?????? ????????????:</span>
                          <p className="item-list__text">{selectedProduct?.type}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">??????????????:</span>
                          <p className="item-list__text">{selectedProduct?.level}</p>
                        </li>
                      </ul>
                    </div>}
                    {selectedTab === TabControl.Description &&
                    <div className="tabs__element is-active">
                      <div className="product__tabs-text">
                        <p>{selectedProduct?.description}</p>
                      </div>
                    </div>}
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
      <h2 className="title title--h3">?????????????? ????????????</h2>
      <div className="product-similar__slider">
        <div className="product-similar__slider-list">
          {selectedProduct && similars.map((similar, index) => (
            <CameraCard key={`camera-${similar.id}`} camera={similar} activeClassName={classnames({'is-active': activeSimilars.includes(index)})}/>
          ))}
        </div>
        <button className={classnames('slider-controls', 'slider-controls--prev',
          {'visually-hidden': FIRST_ACTIVE_SIMILARS.length >= similars.length ||
          nextClickCounter <= FIRST_ACTIVE_SIMILARS.length})}
        type="button" aria-label="???????????????????? ??????????"
        onClick={handlePreviousButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <button className={classnames('slider-controls', 'slider-controls--next', {'visually-hidden': FIRST_ACTIVE_SIMILARS.length >= similars.length ||
        nextClickCounter >= similars.length})}
        type="button" aria-label="?????????????????? ??????????"
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
                <h2 className="title title--h3">????????????</h2>
                <button className="btn" type="button" onClick={handleSendReviewOpen} data-testid="leave-review">???????????????? ???????? ??????????</button>
              </div>
              <ul className="review-block__list">
                {renderReviews}
              </ul>
              <div className={classnames('review-block__buttons', {'visually-hidden':
              reviewsCount <= reviewsRendered})}
              >
                <button className="btn btn--purple" type="button" onClick={handleShowMoreButtonClick}>???????????????? ???????????? ??????????????
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
      {isSuccessModalOpen && <SuccessModal cameraId={selectedProduct?.id} onCloseClick={handleSuccessModalClose} activeTab={activeTab}/>}
    </main>
  );
}

export default Product;
