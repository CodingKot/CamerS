import { getPromo } from '../../store/selectors';
import Banner from '../banner/banner';
import CatalogAside from './catalog-aside/catalog-aside';
import Breadcrumps from '../breadcrumps/breadcrumps';
import { useAppSelector } from '../../hooks/index';
import CatalogPage from './catalog-page/catalog-page';


function Catalog (): JSX.Element {

  const banner = useAppSelector(getPromo);

  return (
    <main>
      {banner && <Banner banner={banner}/>}
      <div className="page-content">
        <Breadcrumps/>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogAside/>
              <CatalogPage/>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Catalog;
