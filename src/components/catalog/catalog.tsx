import { getPromo } from '../../store/selectors';
import Banner from '../banner/banner';
import CatalogAside from './catalog-aside/catalog-aside';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import CatalogContent from './catalog-content/catalog-content';
import { fetchPromo } from '../../store/api-actions';
import { useEffect } from 'react';


function Catalog (): JSX.Element {

  const dispatch = useAppDispatch();

  const banner = useAppSelector(getPromo);

  useEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  return (
    <main>
      {banner && <Banner banner={banner}/>}
      <div className="page-content">
        <Breadcrumbs/>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogAside/>
              <CatalogContent/>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Catalog;
