import { Link } from 'react-router-dom';
import { Query, AppRoute } from '../../../const';
import './catalog-empty.css';

function CatalogEmpty (): JSX.Element {
  return (
    <div className="catalog__empty">
      <p>По вашему запросу ничего не найдено</p>
      <p>Начать <Link className="catalog__empty-link" to={{pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=1`}}>поиск</Link> заново?</p>
    </div>
  );
}

export default CatalogEmpty;
