import { promoProcess } from './promo-process';
import { fetchPromo } from '../api-actions';
import {makeFakePromo} from '../../utils/mocks';

const promo = makeFakePromo();

describe('Reducer: promo', () => {

  it('without additional parametres should return initial state', () => {
    expect(promoProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        promoCamera: undefined,
        isPromoLoading: false,
      });
  });

  describe('fetchPromo test', () => {
    it('should update promo by load promo', () => {
      const state = {
        promoCamera: undefined,
        isPromoLoading: false,
      };
      expect(promoProcess.reducer(state, {type: fetchPromo.fulfilled.type, payload: promo}))
        .toEqual({promoCamera: promo, isPromoLoading: false});
    });
  });
});


