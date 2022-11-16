import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Footer from './footer';


const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Ресурсы/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });


});
