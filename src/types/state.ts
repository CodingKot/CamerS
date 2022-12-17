import { store } from '../store/index';
import { Cameras } from './camera';
import { ResponseStatus } from '../const';
import { Promo } from './promo';
import { Reviews } from './review';

export type CamerasProcess = {
  cameras: Cameras;
  searchedCameras: Cameras;
  isDataLoading: boolean;
  loadingStatus: ResponseStatus;
  pagesNumber: number;

}

export type PromoProcess = {
  promoCamera?: Promo;
  isPromoLoading: boolean;
}

export type ProductProcess = {

  reviews: Reviews;
  similars: Cameras;
}


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
