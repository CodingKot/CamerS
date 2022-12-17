import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Header from './header';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AppRoute} from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameras } from '../../utils/mocks';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const history = createMemoryHistory();

describe('Component: Footer', () => {

  it('should redirect to catalog when user clikes to link', async () => {
    const mockStore = configureMockStore([thunk]);
    const fakeCameras = makeFakeCameras();
    history.push('/fake');

    render(
      <Provider store={mockStore({
        CAMERAS: {
          searchedCameras: fakeCameras
        }
      })}
      >
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Catalog}
              element={<h1>This is catalog</h1>}
            />
            <Route
              path='*'
              element={<Header/>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>

    );

    expect(screen.queryByText(/This is catalog/i)).not.toBeInTheDocument();
    const link = screen.getByText(/Каталог/i);

    await userEvent.click(link);

    expect(screen.getByText(/This is catalog/i)).toBeInTheDocument();
  });
});
