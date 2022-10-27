import {createSlice} from '@reduxjs/toolkit';
import { NameSpase } from '../../const';
import { ProductProcess } from '../../types/state';
import { fetchReviews, fetchSimilars } from '../api-actions';

const initialState: ProductProcess = {
  isProductLoading: false,
  reviews: [],
  similars: [],
};

export const productProcess = createSlice({
  name: NameSpase.Product,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchSimilars.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchSimilars.fulfilled, (state, action) => {
        state.similars = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(fetchSimilars.rejected, (state) => {
        state.isProductLoading = false;
      });
  }
});

