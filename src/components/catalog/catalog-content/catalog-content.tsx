import CameraCard from '../../camera_card/camera_card';
import { Link, useSearchParams} from 'react-router-dom';
import { getIsDataLoading } from '../../../store/selectors';
import { getCameras } from '../../../store/selectors';
import { useAppSelector, useAppDispatch } from '../../../hooks/index';
import { BACK, FORWARD, PAGES_NUMBER, AppRoute, CAMERAS_PER_PAGE, PAGES_START, Query} from '../../../const';
import classNames from 'classnames';
import { fetchCameras } from '../../../store/api-actions';
import {useEffect} from 'react';
import Loading from '../../loading/loading';
import { handleScrollToTop } from '../../../utils/utils';


function CatalogContent ():JSX.Element {

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get(Query.PageNumber));
  const offset = (currentPage - 1) * CAMERAS_PER_PAGE;
  const cameras = useAppSelector(getCameras);
  const isDataLoading = useAppSelector(getIsDataLoading);

  useEffect(() => {

    dispatch(fetchCameras(offset));
  }, [dispatch, offset]);

  return (
    <div className="catalog__content">
      <div className="catalog-sort">
        <form action="#">
          <div className="catalog-sort__inner">
            <p className="title title--h5">Сортировать:</p>
            <div className="catalog-sort__type">
              <div className="catalog-sort__btn-text">
                <input type="radio" id="sortPrice" name="sort"/>
                <label htmlFor="sortPrice">по цене</label>
              </div>
              <div className="catalog-sort__btn-text">
                <input type="radio" id="sortPopular" name="sort"/>
                <label htmlFor="sortPopular">по популярности</label>
              </div>
            </div>
            <div className="catalog-sort__order">
              <div className="catalog-sort__btn catalog-sort__btn--up">
                <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию"/>
                <label htmlFor="up">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-sort"></use>
                  </svg>
                </label>
              </div>
              <div className="catalog-sort__btn catalog-sort__btn--down">
                <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"/>
                <label htmlFor="down">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-sort"></use>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      {isDataLoading ?
        <Loading/> :
        <div className="cards catalog__cards" data-testid="catalog-cards">
          {cameras.map((camera) => (
            <CameraCard key={`camera-${camera.id}`} camera={camera}/>
          ))}
        </div>}
      <div className="pagination" data-testid="pagination">
        <ul className="pagination__list">
          <li className="pagination__item"><Link className={classNames('pagination__link', 'pagination__link--text', {'visually-hidden': currentPage === PAGES_START})} to={{pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=${currentPage - 1}`}} onClick={handleScrollToTop}>{BACK}</Link>
          </li>
          {Array.from({length: PAGES_NUMBER}, (index, item) => item + 1)
            .map((item) => (
              <li className="pagination__item" key={item}>
                <Link className={classNames('pagination__link', {'pagination__link--active': currentPage === item})} to={{pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=${item}`}} onClick={handleScrollToTop}>{item}
                </Link>
              </li>
            ))}
          <li className="pagination__item"><Link className={classNames('pagination__link', 'pagination__link--text', {'visually-hidden': currentPage === PAGES_NUMBER})} to={{pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=${currentPage + 1}`}} onClick={handleScrollToTop}>{FORWARD}</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}

export default CatalogContent;
