import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AppRoute} from '../../const';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Header/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('should redirect to catalog when user clikes to link', async () => {
    history.push('/fake');

    render(
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
    );

    expect(screen.queryByText(/This is catalog/i)).not.toBeInTheDocument();
    const link = screen.getByText(/Каталог/i);

    await userEvent.click(link);

    expect(screen.getByText(/This is catalog/i)).toBeInTheDocument();
  });
});
