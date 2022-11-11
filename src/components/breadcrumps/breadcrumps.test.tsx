import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Breadcrumps from './breadcrumps';


describe('Component: Breadcrumps', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();


    render(
      <HistoryRouter history={history}>
        <Breadcrumps/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });
});
