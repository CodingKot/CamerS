import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Star from './star';


const history = createMemoryHistory();
const fakeXlinkHref = '#icon-star';

describe('Component: Star', () => {
  it('should render correctly', () => {
    render (
      <HistoryRouter history={history}>
        <Star xlinkHref={fakeXlinkHref}/>
      </HistoryRouter>
    );
    expect(screen.getByTestId('star')).toBeInTheDocument();
  });
});
