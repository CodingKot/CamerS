import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Loading from './loading';

const history = createMemoryHistory();

describe('Component: Loading', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Loading/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
