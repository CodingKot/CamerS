import CameraCard from '../../camera_card/camera_card';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getCameras } from '../../../store/selectors';
import { useAppSelector } from '../../../hooks/index';
import { CAMERAS_PER_PAGE, BACK, FORWARD, RE_PAGE_NUMBER} from '../../../const';
import { useState, useEffect } from 'react';
import { handleScrollToTop } from '../../../utils/utils';


function CatalogPage ():JSX.Element {

  const {id} = useParams();
  const [currentPage, setCurrentPage] = useState(Number(id?.replace(RE_PAGE_NUMBER, '')) - 1);
  const cameras = useAppSelector(getCameras);
  const totalPages = Math.ceil(cameras.length / CAMERAS_PER_PAGE);
  const offset = currentPage * CAMERAS_PER_PAGE;
  const navigate = useNavigate();

  const handlePageChange = (selectedItem: {
    selected: number;
  }) => {
    setCurrentPage(selectedItem.selected);
    handleScrollToTop();
  };

  const getPaginatedData = () => (
    cameras.slice(offset, offset + CAMERAS_PER_PAGE)
  );


  const createLink = (pageIndex: number) => `page_${pageIndex}`;

  useEffect(() => {
    navigate(`../catalog/page_${currentPage + 1}`);
  }, [currentPage, navigate]);


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
      <div className="cards catalog__cards">
        {getPaginatedData().map((camera) => (
          <CameraCard key={`camera-${camera.id}`} camera={camera}/>
        ))}
      </div>
      <div className="pagination">
        <ReactPaginate
          initialPage={currentPage}
          pageCount={totalPages}
          previousLabel={BACK}
          nextLabel={FORWARD}
          containerClassName="pagination__list"
          pageClassName="pagination__item"
          pageLinkClassName="pagination__link"
          activeLinkClassName="pagination__link--active"
          previousClassName="pagination__item"
          nextClassName="pagination__item"
          disabledClassName="visually-hidden"
          previousLinkClassName="pagination__link pagination__link--text"
          nextLinkClassName="pagination__link pagination__link--text"
          onPageChange={handlePageChange}
          hrefBuilder={createLink}
        />
      </div>
    </div>

  );
}

export default CatalogPage;
