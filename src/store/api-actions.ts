import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Cameras, Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { ApiRoute, AppRoute, CAMERAS_PER_PAGE } from '../const';
import { Reviews } from '../types/review';
import { redirectToRoute } from './action';
import { ReviewPost } from '../types/review-post';

export const fetchCameras = createAsyncThunk<Cameras, number,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchCameras',
  async(startIndex, {dispatch, extra: api}) => {
    const {data} = await (api.get<Cameras>(`${ApiRoute.Cameras}?_start=${startIndex}&_end=${startIndex + CAMERAS_PER_PAGE}`));
    return data;
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


