import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Breadcrumbs from './breadcrumbs';
import {AppRoute, Query} from '../../const';


describe('Component: Breadcrumps', () => {
  it('should render correctly', () => {

    const history = createMemoryHistory();
    history.push({pathname: AppRoute.Catalog, search: `?${Query.PageNumber}=1`});
    render(
      <HistoryRouter history={history}>
        <Breadcrumbs/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();

  });
});
