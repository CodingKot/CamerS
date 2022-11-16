import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Home from './home';


describe('Component: Home', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render (
      <HistoryRouter history={history}>
        <Home/>
      </HistoryRouter>
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
