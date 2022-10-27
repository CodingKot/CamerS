import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import { rootReducer } from '../root-reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import {AppRoute} from '../../const';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<AppRoute>) => {
        if (action.type === 'redirectToRoute') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
