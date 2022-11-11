import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Product from './product';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { makeFakeCameras, makeFakeReviews } from '../../utils/mocks';
import { ResponseStatus } from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const fakeCameras = makeFakeCameras();
const fakeReviews = makeFakeReviews();

describe('Component: Product', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={mockStore({
        CAMERAS: {
          cameras: fakeCameras,
          isDataLoading: false,
          loadingStatus: ResponseStatus.Fulfilled,
        },
        PRODUCT: {
          isProductLoading: false,
          reviews: fakeReviews,
          similars: fakeCameras
        }
      })}
      >
        <HistoryRouter history={history}>
          <Product/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.queryByText(/Оставить отзыв/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('leave-review'));
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();

  });
});
