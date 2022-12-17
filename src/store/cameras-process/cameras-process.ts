import {createSlice} from '@reduxjs/toolkit';
import { CAMERAS_PER_PAGE, NameSpase, ResponseStatus } from '../../const';
import { CamerasProcess } from '../../types/state';
import { fetchCameras, fetchSelectedProduct, fetchSearchedCameras} from '../api-actions';
import { updateItem } from '../../utils/utils';
import { resetSearchedCameras } from '../action';


const initialState: CamerasProcess = {
  cameras: [],
  searchedCameras: [],
  isDataLoading: false,
  loadingStatus: ResponseStatus.Initial,
  pagesNumber: 0,
};

export const camerasProcess = createSlice({
  name: NameSpase.Cameras,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.pagesNumber = Math.ceil(action.payload.length / CAMERAS_PER_PAGE);
        state.isDataLoading = false;
        state.loadingStatus = ResponseStatus.Fulfilled;
      })
      .addCase(fetchCameras.rejected, (state) => {
        state.isDataLoading = false;
        state.loadingStatus = ResponseStatus.Rejected;
      })
      .addCase(fetchSearchedCameras.fulfilled, (state, action) => {
        state.searchedCameras = action.payload;
      })
      .addCase(resetSearchedCameras, (state) => {
        state.searchedCameras = [];
      })
      .addCase(fetchSelectedProduct.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSelectedProduct.fulfilled, (state, action) => {
        if(action.payload) {
          state.cameras = updateItem(state.cameras, action.payload);
        }
        state.isDataLoading = false;
      })
      .addCase(fetchSelectedProduct.rejected, (state) => {
        state.isDataLoading = false;
      });
  }
});
