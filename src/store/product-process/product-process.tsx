import {createSlice} from '@reduxjs/toolkit';
import { NameSpase } from '../../const';
import { ProductProcess } from '../../types/state';
import { fetchReviews, fetchSimilars } from '../api-actions';

const initialState: ProductProcess = {

  reviews: [],
  similars: [],
};

export const productProcess = createSlice({
  name: NameSpase.Product,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;

      })
      .addCase(fetchSimilars.fulfilled, (state, action) => {
        state.similars = action.payload;

      });
  }
});

