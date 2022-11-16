import {render, screen} from '@testing-library/react';
import Banner from './banner';
import { makeFakePromo } from '../../utils/mocks';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';


describe('Component: Banner', ()=> {
  it('should render correctly', ()=> {
    const fakePromo = makeFakePromo();
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <Banner banner={fakePromo}/>
      </HistoryRouter>
    );
    expect (screen.getByText(fakePromo.name)).toBeInTheDocument();
    expect (screen.getByText(/Новинка!/i)).toBeInTheDocument();
    expect (screen.getByText(/Профессиональная камера от известного производителя/i)).toBeInTheDocument();
    const button = screen.getByText(/Подробнее/i);
    expect (button).toBeInTheDocument();
  });
});
