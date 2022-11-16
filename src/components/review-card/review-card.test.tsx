import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import ReviewCard from './review-card';
import { makeFakeReview } from '../../utils/mocks';

describe('Component: CameraCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeReview = makeFakeReview();

    render (
      <HistoryRouter history={history}>
        <ReviewCard review={fakeReview}/>
      </HistoryRouter>
    );

    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.review)).toBeInTheDocument();

  });
});
