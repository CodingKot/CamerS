import { NameSpase } from '../const';
import { State } from '../types/state';
import { compareDates } from '../utils/utils';
import {createSelector} from '@reduxjs/toolkit';

export const getCamerasPerPage = (state: State) => state[NameSpase.Cameras].cameras;
export const getPagesNumber = (state: State) => state[NameSpase.Cameras].pagesNumber;
export const getSearchedCameras = (state: State) => state[NameSpase.Cameras].searchedCameras;
export const getIsDataLoading = (state: State) => state[NameSpase.Cameras].isDataLoading;
export const getLoadingStatus = (state: State) => state[NameSpase.Cameras].loadingStatus;
export const getPromo = (state: State) => state[NameSpase.Promo].promoCamera;
const getReviews = (state: State) => state[NameSpase.Product].reviews;

export const getSortedReviews = createSelector (
  getReviews,
  (reviews) => {
    const sortedReviews = [...reviews];
    sortedReviews.sort(compareDates);
    return sortedReviews;
  }
);

export const getSimilars = (state: State) => state[NameSpase.Product].similars;

export const getSelectedProduct = (id: number) => (state: State) => state[NameSpase.Cameras].cameras.find((camera) => camera.id === id);


