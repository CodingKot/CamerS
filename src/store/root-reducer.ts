import {combineReducers} from '@reduxjs/toolkit';
import { NameSpase } from '../const';
import { camerasProcess } from './cameras-process/cameras-process';
import { promoProcess } from './promo-process/promo-process';
import { productProcess } from './product-process/product-process';


export const rootReducer = combineReducers({
  [NameSpase.Cameras]: camerasProcess.reducer,
  [NameSpase.Promo]: promoProcess.reducer,
  [NameSpase.Product]: productProcess.reducer,
});
