import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../history-route/history-route';
import CatalogAside from './catalog-aside';

describe('Component: CatalogAside', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <CatalogAside/>
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
