import {createSlice} from '@reduxjs/toolkit';
import { NameSpase } from '../../const';
import { PromoProcess } from '../../types/state';
import { fetchPromo } from '../api-actions';

const initialState: PromoProcess = {
  promoCamera: undefined,
  isPromoLoading: false,
};

export const promoProcess = createSlice({
  name: NameSpase.Promo,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promoCamera = action.payload;
        state.isPromoLoading = false;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.isPromoLoading = false;
      });
  }
});


