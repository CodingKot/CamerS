import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../history-router/history-router';
import SearchForm from './search-form';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameras } from '../../../utils/mocks';
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
          <SearchForm/>
        </HistoryRouter>
      </Provider>

    );

    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
  });

});
