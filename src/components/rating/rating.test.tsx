import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Rating from './rating';


const history = createMemoryHistory();
const fakeRating = 5;
const fakeClassName = 'rating';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Rating rating={fakeRating} className={fakeClassName}/>
      </HistoryRouter>
    );
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
  });
});
