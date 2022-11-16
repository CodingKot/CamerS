import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../history-router/history-router';
import ReviewSendModal from './review-send-modal';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const handleFakeSuccess = jest.fn();
const handleFakeCloseClick = jest.fn();

describe('Component: ReviewSendModal', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore({})}>
          <ReviewSendModal onSuccess={handleFakeSuccess} onCloseClick={handleFakeCloseClick}/>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Недостатки/i)).toBeInTheDocument();

  });
});

