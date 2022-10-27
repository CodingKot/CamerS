import {createSlice} from '@reduxjs/toolkit';
import { NameSpase, ResponseStatus } from '../../const';
import { CamerasProcess } from '../../types/state';
import { fetchCameras, fetchSelectedProduct } from '../api-actions';
import { updateItem } from '../../utils/utils';


const initialState: CamerasProcess = {
  cameras: [],
  isDataLoading: false,
  loadingStatus: ResponseStatus.Initial,
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
        state.isDataLoading = false;
        state.loadingStatus = ResponseStatus.Fulfilled;
      })
      .addCase(fetchCameras.rejected, (state) => {
        state.isDataLoading = false;
        state.loadingStatus = ResponseStatus.Rejected;
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
