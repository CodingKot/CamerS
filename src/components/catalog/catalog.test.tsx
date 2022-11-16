import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Catalog from './catalog';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {makeFakeCameras, makeFakePromo} from '../../utils/mocks';
import {ResponseStatus} from '../../const';

describe('Component: Home', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const mockStore = configureMockStore([thunk]);
    const fakeCameras = makeFakeCameras();
    const fakePromo = makeFakePromo();

    render (
      <Provider store = {mockStore({
        CAMERAS: {
          cameras: fakeCameras,
          isDataLoading: false,
          loadingStatus: ResponseStatus.Fulfilled,
        },
        PROMO: {
          promoCamera: fakePromo,
          isPromoLoading: false,
        },
      })}
      >
        <HistoryRouter history={history}>
          <Catalog/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('aside')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
