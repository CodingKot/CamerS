import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import CameraCard from './camera_card';
import {makeFakeCamera} from '../../utils/mocks';

describe('Component: CameraCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeCamera = makeFakeCamera();

    render (
      <HistoryRouter history={history}>
        <CameraCard camera={fakeCamera}/>
      </HistoryRouter>
    );

    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByAltText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();

    const buttonDetails = screen.getByText(/Подробнее/i);
    expect (buttonDetails).toBeInTheDocument();

    const buttonBusket = screen.getByText(/Купить/i);
    expect (buttonBusket).toBeInTheDocument();

  });
});
