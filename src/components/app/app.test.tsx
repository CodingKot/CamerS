import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import { makeFakeCameras, makeFakePromo, makeFakeReviews } from '../../utils/mocks';
import { AppRoute, ResponseStatus, Query } from '../../const';
import thunk from 'redux-thunk';
import { generatePath } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
const fakeCameras = makeFakeCameras();
const fakePromo = makeFakePromo();
const fakeReviews = makeFakeReviews();

const store = mockStore({
  CAMERAS: {
    cameras: fakeCameras,
    isDataLoading: false,
    loadingStatus: ResponseStatus.Fulfilled,
  },
  PROMO: {
    promoCamera: fakePromo,
    isPromoLoading: false,
  },
  PRODUCT: {
    isProductLoading: false,
    reviews: fakeReviews,
    similars: fakeCameras
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render Home Paige when user navigates to "/"', () => {
    history.push(AppRoute.Home);

    render(fakeApp);

    expect(screen.getByText(/Главная страница в разработке/i)).toBeInTheDocument();
  });
  it('should render Catalog First Page when user navigates to "/catalog/page_1"', () => {
    history.push({pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=1`});

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
  it('should render Product Page when user navigates to"product/id/description"', () => {
    const id = fakeCameras[0].id;
    history.push(generatePath(AppRoute.Product, {id: `${id}`}));

    render(fakeApp);

    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
  it('should render Not Found Page when user navigates to unKnown path', () => {
    const unknownPath = '/500';
    history.push(unknownPath);

    render(fakeApp);

    expect(screen.getByText(/404. Страница не найден/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();

  });
});
