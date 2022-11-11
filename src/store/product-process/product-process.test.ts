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
        isProductLoading: false,
        reviews: [],
        similars: [],
      });
  });
  it('should update isProductLoading by fetchRevievs pending', () => {
    state = {
      isProductLoading: false,
      reviews: [],
      similars: [],
    };
    expect(productProcess.reducer(state, {type: fetchReviews.pending.type}))
      .toEqual({
        isProductLoading: true,
        reviews: [],
        similars: [],
      });
  });
  it('should update isProductLoading by fetchSimilars pending', () => {
    state = {
      isProductLoading: false,
      reviews: [],
      similars: [],
    };
    expect(productProcess.reducer(state, {type: fetchSimilars.pending.type}))
      .toEqual({
        isProductLoading: true,
        reviews: [],
        similars: [],
      });
  });
  it('should update reviews and isProductLoading by fetchRevievs fulfilled', () => {
    state = {
      isProductLoading: true,
      reviews: [],
      similars: [],
    };
    expect(productProcess.reducer(state, {type: fetchReviews.fulfilled.type, payload: reviews}))
      .toEqual({
        isProductLoading: false,
        reviews,
        similars: [],
      });
  });
  it('should update similars and isProductLoading by fetchSimilars fulfilled', () => {
    state = {
      isProductLoading: true,
      reviews: reviews,
      similars: [],
    };
    expect(productProcess.reducer(state, {type: fetchSimilars.fulfilled.type, payload: similars}))
      .toEqual({
        isProductLoading: false,
        reviews,
        similars,
      });
  });
  it('should update isProductLoading by fetchReviews rejected', () => {
    state = {
      isProductLoading: true,
      reviews: [],
      similars: [],
    };
    expect(productProcess.reducer(state, {type: fetchReviews.rejected.type}))
      .toEqual({
        isProductLoading: false,
        reviews: [],
        similars: [],
      });
  });
  it('should update isProductLoading by fetchSimilars rejected', () => {
    state = {
      isProductLoading: true,
      reviews: [],
      similars: [],
    };
    expect(productProcess.reducer(state, {type: fetchSimilars.rejected.type}))
      .toEqual({
        isProductLoading: false,
        reviews: [],
        similars: [],
      });
  });

});
