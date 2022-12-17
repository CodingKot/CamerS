import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../history-router/history-router';
import CatalogAside from './catalog-aside';

describe('Component: CatalogAside', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilterParams = {
      maxPrice: '100000',
      minPrice: '1000',
      category: [],
      type: [],
      level: [],
    };

    render(
      <HistoryRouter history={history}>
        <CatalogAside
          handleFilterParamsChange={jest.fn()}
          checkMaxPrice={jest.fn()}
          checkMinPrice={jest.fn()}
          handleMinPriceChange={jest.fn()}
          handleMaxPriceChange={jest.fn()}
          minPricePlaceholder={'1900'}
          maxPricePlaceholder={'20000'}
          filterParams={fakeFilterParams}
          minPrice='1000'
          maxPrice='1000000'
          resetFilterParams={jest.fn()}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();

    const resetButton = screen.getByText(/Сбросить фильтры/i);
    expect(resetButton).toBeInTheDocument();
  });
});
