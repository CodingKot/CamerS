import { ProductProcess } from '../../types/state';
import { productProcess } from './product-process';
import { fetchReviews, fetchSimilars } from '../api-actions';
import { makeFakeReviews, makeFakeCameras } from '../../utils/mocks';

const reviews = makeFakeReviews();
const similars = makeFakeCameras();

describe('Reducer: productProcess', () => {
  let state: ProductProcess;
  it('without addidional parametrs should return initial state', () => {
    expect(productProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        reviews: [],
        similars: [],
      });
  });

  it('should update reviews by fetchRevievs fulfilled', () => {
    state = {
      reviews: [],
      similars: [],
    };
    expect(productProcess.reducer(state, {type: fetchReviews.fulfilled.type, payload: reviews}))
      .toEqual({
        reviews,
        similars: [],
      });
  });
  it('should update similars by fetchSimilars fulfilled', () => {
    state = {
      reviews: reviews,
      similars: [],
    };
    expect(productProcess.reducer(state, {type: fetchSimilars.fulfilled.type, payload: similars}))
      .toEqual({
        reviews,
        similars,
      });
  });

});
