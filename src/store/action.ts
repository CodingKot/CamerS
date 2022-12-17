import {createAction} from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { Cameras } from '../types/camera';

export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');
export const pressUp = createAction<Cameras>('list/pressUp');
export const pressDown = createAction<Cameras>('list/pressDown');
export const selectItem = createAction<number>('list/selectItem');
export const resetSearchedCameras = createAction('cameras/resetSearchedCameras');

