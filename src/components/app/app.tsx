import Home from '../home/home';
import Catalog from '../catalog/catalog';
import Product from '../product/product';
import {Route, Routes} from 'react-router-dom';
import { AppRoute, ResponseStatus } from '../../const';
import { getLoadingStatus } from '../../store/selectors';
import { useAppSelector } from '../../hooks';
import NotFound from '../../pages/not-found/not-found';
import LoadingError from '../../pages/loading-error/loading-error';
import Layout from '../../pages/layout/layout';

function App(): JSX.Element {

  const loadingStatus = useAppSelector(getLoadingStatus);


  if(loadingStatus === ResponseStatus.Rejected) {
    return (
      <LoadingError/>
    );
  }

  return (

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

  );
}

export default App;
