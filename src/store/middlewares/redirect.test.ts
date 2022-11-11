import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';
import { State } from '../../types/state';


const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history.ts', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });
  it('should be redirected to not found', () => {
    store.dispatch(redirectToRoute(AppRoute.NotFound));
    expect(fakeHistory.location.pathname).toBe(AppRoute.NotFound);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NotFound),
    ]);
  });
  it('should not be redirected to catalog first page because of bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: '/catalog?page=1'});
    expect(fakeHistory.location.pathname).not.toBe('/catalog?page=1');
  });
});
