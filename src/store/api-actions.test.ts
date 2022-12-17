import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { fetchCameras, fetchReviews, fetchSimilars, fetchPromo, fetchSelectedProduct, postReview, fetchSearchedCameras, fetchMinPrice, fetchMaxPrice } from './api-actions';
import { ApiRoute, GetParameter, SortParameter, OrderParameter} from '../const';
import { State } from '../types/state';
import { makeFakeCameras, makeFakeReviews, makeFakePromo, makeFakeCamera, makeFakePostReview } from '../utils/mocks';
import { redirectToRoute } from './action';
import { Reviews } from '../types/review';
import { Cameras } from '../types/camera';

describe('Async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Promo when GET /promo', async () => {
    const fakePromo = makeFakePromo();
    mockApi
      .onGet(ApiRoute.Promo)
      .reply(200, fakePromo);

    const store = mockStore();

    await store.dispatch(fetchPromo());

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchPromo.pending.type,
      fetchPromo.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Сameras when GET /cameras/?query_params', async () => {
    const fakeCameras = makeFakeCameras();

    const queryParams = {
      sortType: 'price',
      order: 'asc',
      minPrice: '1000',
      maxPrice: '100000',
      category: ['Видеокамера'],
      type: ['Цифровая'],
      level: ['Нулевой'],
    };

    const params = {
      [GetParameter.Sort]: queryParams.sortType,
      [GetParameter.Order]: queryParams.order,
      [GetParameter.PriceMin]: queryParams.minPrice,
      [GetParameter.PriceMax]: queryParams.maxPrice,
      [GetParameter.Category]: queryParams.category,
      [GetParameter.Type]: queryParams.type,
      [GetParameter.Level]: queryParams.level,
    };

    mockApi
      .onGet(ApiRoute.Cameras, params)
      .reply(200, fakeCameras);

    const store = mockStore();

    await store.dispatch(fetchCameras(queryParams));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchCameras.pending.type,
      fetchCameras.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Selected_Product when GET /cameras/id', async () => {
    const fakeCamera = makeFakeCamera();
    const id = 1;
    mockApi
      .onGet(`${ApiRoute.Cameras}/${id}`)
      .reply(200, fakeCamera);

    const store = mockStore();

    await store.dispatch(fetchSelectedProduct(id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchSelectedProduct.pending.type,
      fetchSelectedProduct.fulfilled.type,
    ]);
  });

  it('should dispatch redirect when GET /cameras/id failed', async () => {
    const fakeCamera = undefined;
    const id = NaN;
    mockApi
      .onGet(`${ApiRoute.Cameras}/${id}`)
      .reply(404, fakeCamera);

    const store = mockStore();

    await store.dispatch(fetchSelectedProduct(id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchSelectedProduct.pending.type,
      redirectToRoute.type,
      fetchSelectedProduct.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Reviews when GET /reviews', async () => {
    const fakeReviews = makeFakeReviews();
    const id = 1;
    mockApi
      .onGet(`${ApiRoute.Cameras}/${id}${ApiRoute.Reviews}`)
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(fetchReviews(id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchReviews.pending.type,
      fetchReviews.fulfilled.type,
    ]);
  });

  it('should dispatch redirect when GET /reviews failed', async () => {
    const fakeReviews: Reviews = [];
    const id = NaN;
    mockApi
      .onGet(`${ApiRoute.Cameras}/${id}${ApiRoute.Reviews}`)
      .reply(404, fakeReviews);

    const store = mockStore();

    await store.dispatch(fetchReviews(id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchReviews.pending.type,
      redirectToRoute.type,
      fetchReviews.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Similars when GET /similars', async () => {
    const fakeCameras = makeFakeCameras();
    const id = 1;
    mockApi
      .onGet(`${ApiRoute.Cameras}/${id}${ApiRoute.Similar}`)
      .reply(200, fakeCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilars(id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchSimilars.pending.type,
      fetchSimilars.fulfilled.type,
    ]);
  });

  it('should dispatch redirect when GET /similars failed', async () => {
    const fakeCameras: Cameras = [];
    const id = NaN;
    mockApi
      .onGet(`${ApiRoute.Cameras}/${id}${ApiRoute.Reviews}`)
      .reply(404, fakeCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilars(id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchSimilars.pending.type,
      redirectToRoute.type,
      fetchSimilars.fulfilled.type,
    ]);
  });

  it('should dispatch Post_Review when POST /reviews', async () => {
    const fakePostReview = makeFakePostReview();
    mockApi
      .onPost(ApiRoute.Reviews)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postReview(fakePostReview));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      postReview.pending.type,
      postReview.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Searched_Cameras when GET /cameras/?like', async () => {
    const fakeCameras = makeFakeCameras();

    const queryName = 'a';

    const params = {
      [GetParameter.Like]: queryName,
    };

    mockApi
      .onGet(ApiRoute.Cameras, params)
      .reply(200, fakeCameras);

    const store = mockStore();

    await store.dispatch(fetchSearchedCameras(queryName));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchSearchedCameras.pending.type,
      fetchSearchedCameras.fulfilled.type,
    ]);
  });

  it('should dispatch Load_minPrice when GET /cameras/?price_gte', async () => {
    const fakePrice = '1990';

    const queryPrice = 2000;

    const params = {
      [GetParameter.PriceMin]: queryPrice,
      [GetParameter.Sort]: SortParameter.Price,
      [GetParameter.Order]: OrderParameter.Up,
    };

    mockApi
      .onGet(ApiRoute.Cameras, params)
      .reply(200, fakePrice);

    const store = mockStore();

    await store.dispatch(fetchMinPrice(queryPrice));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchMinPrice.pending.type,
      fetchMinPrice.fulfilled.type,
    ]);
  });
  it('should dispatch Load_maxPrice when GET /cameras/?price_lte', async () => {
    const fakePrice = '199000';

    const queryPrice = 180000;

    const params = {
      [GetParameter.PriceMin]: queryPrice,
      [GetParameter.Sort]: SortParameter.Price,
      [GetParameter.Order]: OrderParameter.Up,
    };

    mockApi
      .onGet(ApiRoute.Cameras, params)
      .reply(200, fakePrice);

    const store = mockStore();

    await store.dispatch(fetchMaxPrice(queryPrice));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([

      fetchMaxPrice.pending.type,
      fetchMaxPrice.fulfilled.type,
    ]);
  });

});
