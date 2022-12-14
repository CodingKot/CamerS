import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../history-router/history-router';
import ReviewSendModal from './review-send-modal';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const handleFakeSuccess = jest.fn();
const handleFakeCloseClick = jest.fn();

describe('Component: ReviewSendModal', () => {
  it('should fill the fields correctly', async () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={mockStore({})}>
          <ReviewSendModal onSuccess={handleFakeSuccess} onCloseClick={handleFakeCloseClick}/>
        </Provider>

      </HistoryRouter>
    );

    await userEvent.type(screen.getByTestId('name'), 'Name Name');
    await userEvent.type(screen.getByTestId('advantage'), 'Everything is fine');
    await userEvent.type(screen.getByTestId('disadvantage'), 'None');
    await userEvent.type(screen.getByTestId('review'), 'My review');

    expect(screen.getByDisplayValue(/Name Name/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Everything is fine/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/None/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/My review/i)).toBeInTheDocument();
  });
});
