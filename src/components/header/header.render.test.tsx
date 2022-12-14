import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Header from './header';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameras } from '../../utils/mocks';
import { Provider } from 'react-redux';


const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore([thunk]);
    const fakeCameras = makeFakeCameras();
    render(
      <Provider store={mockStore({
        CAMERAS: {
          searchedCameras: fakeCameras
        }
      })}
      >
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>

    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

});
