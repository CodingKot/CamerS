import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Logo from './logo';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should redirect to home when user clicks link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/'
            element={<h1>This is home page</h1>}
          />
          <Route
            path='*'
            element={<Logo/>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is home page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is home page/i)).toBeInTheDocument();
  });
});
