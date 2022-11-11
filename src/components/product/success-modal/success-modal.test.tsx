import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../history-route/history-route';
import SuccessModal from './success-modal';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const handleFakeCloseClisk = jest.fn();
const fakeTab = 'description';


describe('Component: SuccessModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SuccessModal onCloseClick={handleFakeCloseClisk} activeTab={fakeTab}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });

});
