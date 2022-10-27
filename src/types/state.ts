import { store } from '../store/index';
import { Cameras } from './camera';
import { ResponseStatus } from '../const';
import { Promo } from './promo';
import { Reviews } from './review';

export type CamerasProcess = {
  cameras: Cameras;
  isDataLoading: boolean;
  loadingStatus: ResponseStatus;
}

export type PromoProcess = {
  promoCamera?: Promo;
  isPromoLoading: boolean;
}

export type ProductProcess = {
  isProductLoading: boolean;
  reviews: Reviews;
  similars: Cameras;
}


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
