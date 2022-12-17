import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../history-router/history-router';
import CatalogContent from './catalog-content';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {ResponseStatus} from '../../../const';
import {makeFakeCameras} from '../../../utils/mocks';
import thunk from 'redux-thunk';

describe('Component: CatalogContent', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore([thunk]);
    const history = createMemoryHistory();
    const fakeCameras = makeFakeCameras();

    render(
      <Provider store={mockStore({
        CAMERAS: {
          cameras: fakeCameras,
          isDataLoading: false,
          loadingStatus: ResponseStatus.Fulfilled,
        }
      })}
      >
        <HistoryRouter history={history}>
          <CatalogContent
            cameras={fakeCameras}
            sortingType='price'
            orderType='asc'
            isDataLoading={false}
            currentPage={1}
            handleOrderSearchParams={jest.fn()}
            handleSortingSearchParams={jest.fn()}
            generateQueryParams={jest.fn()}

          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по популярности/i)).toBeInTheDocument();
    expect(screen.getByTestId('catalog-cards')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    const links = screen.getAllByText(/Подробнее/i);
    expect(links[0]).toHaveClass('btn--transparent');
  });
});
