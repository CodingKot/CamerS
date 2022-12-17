import CameraCard from '../../camera-card/camera-card';
import { Link} from 'react-router-dom';
import { BACK, FORWARD, AppRoute, PAGES_START, SORTING_BUTTONS, ORDER_BUTTONS} from '../../../const';
import classNames from 'classnames';
import Loading from '../../loading/loading';
import { handleScrollToTop } from '../../../utils/utils';
import { Camera } from '../../../types/camera';
import { getPagesNumber } from '../../../store/selectors';
import { useAppSelector } from '../../../hooks';

type CatalogContentProps = {
  handleSortingSearchParams: (sortingType: string) => void;
  handleOrderSearchParams: (orderType: string) => void;
  generateQueryParams: (page: number) => string;
  sortingType: string | null;
  orderType: string | null;
  currentPage: number;
  cameras: Camera[];
  isDataLoading: boolean;
}

function CatalogContent ({handleSortingSearchParams, handleOrderSearchParams, generateQueryParams, sortingType, orderType, cameras, isDataLoading, currentPage}: CatalogContentProps):JSX.Element {
  const pagesNumber = useAppSelector(getPagesNumber);

  return (
    <div className="catalog__content" data-testid="content">
      <div className="catalog-sort">
        <form action="#">
          <div className="catalog-sort__inner">
            <p className="title title--h5">Сортировать:</p>
            <div className="catalog-sort__type">
              {SORTING_BUTTONS.map((button) => (
                <div className="catalog-sort__btn-text" key={button.value}>
                  <input type="radio" id={button.value} name="sort" value={button.sortParameter} checked={sortingType === button.sortParameter}
                    onChange={() => {
                      handleSortingSearchParams(button.sortParameter);
                    }}
                  />
                  <label htmlFor={button.value}>{button.label}</label>
                </div>
              ))}
            </div>
            <div className="catalog-sort__order">
              {ORDER_BUTTONS.map((button) => (
                <div className={`catalog-sort__btn ${button.className}`} key={button.value}>
                  <input type="radio" id={button.value} name="sort-icon" aria-label={button.label}
                    checked={orderType === button.orderParameter}
                    onChange={() => {
                      handleOrderSearchParams(button.orderParameter);
                    }}
                  />
                  <label htmlFor={button.value}>
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-sort"></use>
                    </svg>
                  </label>
                </div>
              ))}
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
      {pagesNumber !== 0
      &&
      <div className="pagination" data-testid="pagination">
        <ul className="pagination__list">
          <li className="pagination__item">
            <Link className={classNames('pagination__link', 'pagination__link--text', {'visually-hidden': currentPage === PAGES_START})} to={{pathname: AppRoute.Catalog, search: `${generateQueryParams(currentPage - 1)}`}}
              onClick={() => {
                handleScrollToTop();
              }}
            >{BACK}
            </Link>
          </li>
          {Array.from({length: pagesNumber}, (index, item) => item + 1)
            .map((item) => {
              const query = generateQueryParams(item);
              return (
                <li className="pagination__item" key={item}>
                  <Link className={classNames('pagination__link', {'pagination__link--active': currentPage === item})} to={{pathname: AppRoute.Catalog, search: `${query}`}}
                    onClick={handleScrollToTop}
                  >{item}
                  </Link>
                </li>
              );
            }
            )}
          <li className="pagination__item">
            <Link className={classNames('pagination__link', 'pagination__link--text', {'visually-hidden': currentPage === pagesNumber})} to={{pathname: AppRoute.Catalog, search: `${generateQueryParams(currentPage + 1)}`}}
              onClick={handleScrollToTop}
            >{FORWARD}
            </Link>
          </li>
        </ul>
      </div>}

    </div>
  );
}

export default CatalogContent;
