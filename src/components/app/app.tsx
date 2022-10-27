import Home from '../home/home';
import Catalog from '../catalog/catalog';
import Product from '../product/product';
import {Route, Routes} from 'react-router-dom';
import { AppRoute, ResponseStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import LoadingPage from '../../pages/loading-page/loading-page';
import { getIsDataLoading, getIsPromoLoading, getLoadingStatus } from '../../store/selectors';
import { useAppSelector } from '../../hooks';
import NotFound from '../../pages/not-found/not-found';
import LoadingError from '../../pages/loading-error/loading-error';
import Layout from '../../pages/layout/layout';

function App(): JSX.Element {
  const isCamerasLoading = useAppSelector(getIsDataLoading);
  const isPromoLoading = useAppSelector(getIsPromoLoading);
  const loadingStatus = useAppSelector(getLoadingStatus);


  if(isCamerasLoading || isPromoLoading) {
    return (
      <LoadingPage/>
    );
  }

  if(loadingStatus === ResponseStatus.Rejected) {
    return (
      <LoadingError/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Home} element={<Layout/>}>
          <Route index element = {<Home/>}/>
          <Route path={AppRoute.Catalog} element={<Catalog/>}/>
          <Route path={AppRoute.Product} element={<Product/>}/>
        </Route>
        <Route
          path="*"
          element={<NotFound/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
