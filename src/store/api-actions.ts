import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Cameras, Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { ApiRoute, AppRoute, GetParameter, SortParameter, OrderParameter } from '../const';
import { Reviews } from '../types/review';
import { redirectToRoute } from './action';
import { ReviewPost } from '../types/review-post';
import { QueryParams } from '../types/query-params';


export const fetchCameras = createAsyncThunk<Cameras, QueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchCameras',
  async({sortType, order, minPrice, maxPrice, category, type, level}, {dispatch, extra: api}) => {

    const params = {
      [GetParameter.Sort]: sortType,
      [GetParameter.Order]: order,
      [GetParameter.PriceMin]: minPrice,
      [GetParameter.PriceMax]: maxPrice,
      [GetParameter.Category]: category,
      [GetParameter.Type]: type,
      [GetParameter.Level]: level,
    };

    const {data} = await (api.get<Cameras>(ApiRoute.Cameras, {params}));
    if(data.length === 0) {
      dispatch(redirectToRoute(AppRoute.CatalogEmpty));
    }
    return data;
  }
);

export const fetchSearchedCameras = createAsyncThunk<Cameras, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchSearchedCameras',
  async(searchValue, {dispatch, extra: api}) => {
    if(searchValue === '') {
      return [];
    }
    const params = {
      [GetParameter.Like]: searchValue,
    };

    const {data} = await (api.get<Cameras>(ApiRoute.Cameras, {params}));
    return data;
  }
);

export const fetchMinPrice = createAsyncThunk<string, undefined | number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchMinPrice',
  async(price, {dispatch, extra: api}) => {

    if(price) {
      if(price) {
        const params = {
          [GetParameter.PriceMax]: price,
          [GetParameter.Sort]: SortParameter.Price,
          [GetParameter.Order]: OrderParameter.Up,
        };

        const {data} = await (api.get<Cameras>(ApiRoute.Cameras, {params}));
        return data[data.length - 1].price.toString();
      }
    }
    const params = {
      [GetParameter.PriceMin]: price,
      [GetParameter.Sort]: SortParameter.Price,
      [GetParameter.Order]: OrderParameter.Up,
    };
    const {data} = await (api.get<Cameras>(ApiRoute.Cameras, {params}));
    return data[0].price.toString();
  }
);

export const fetchMaxPrice = createAsyncThunk<string, undefined | number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchMaxPrice',
  async(price, {dispatch, extra: api}) => {

    if(price) {
      const params = {
        [GetParameter.PriceMin]: price,
        [GetParameter.Sort]: SortParameter.Price,
        [GetParameter.Order]: OrderParameter.Up,
      };
      const {data} = await (api.get<Cameras>(ApiRoute.Cameras, {params}));
      return data[0].price.toString();
    }
    const params = {
      [GetParameter.Sort]: SortParameter.Price,
      [GetParameter.Order]: OrderParameter.Up,
    };
    const {data} = await (api.get<Cameras>(ApiRoute.Cameras, {params}));
    return data[data.length - 1].price.toString();
  }
);


export const fetchPromo = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'promo/fetchPromo',
  async (_, {dispatch, extra: api}) => {
    const {data} = await (api.get<Promo>(ApiRoute.Promo));
    return data;
  }
);

export const fetchReviews = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(`${ApiRoute.Cameras}/${id}${ApiRoute.Reviews}`);
      return data;
    }
    catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return [];
    }
  }
);

export const fetchSimilars = createAsyncThunk<Cameras, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchSimilars',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Cameras>(`${ApiRoute.Cameras}/${id}${ApiRoute.Similar}`);
      return data;
    }
    catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return [];
    }
  }
);

export const fetchSelectedProduct = createAsyncThunk<Camera | undefined, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchSelectedProduct',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera>(`${ApiRoute.Cameras}/${id}`);
      return data;
    }
    catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return undefined;
    }

  }
);

export const postReview = createAsyncThunk<void, ReviewPost,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/postReview',
  async({cameraId, userName, advantage, disadvantage, review, rating}, {dispatch, extra: api}) => {
    await (api.post<void>(ApiRoute.Reviews, {cameraId, userName, advantage, disadvantage, review, rating}));
  }
);


