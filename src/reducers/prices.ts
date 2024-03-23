
import { type ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { REDUX_STATES, StripePrice } from "../@types";
import { clearAdminPrices, getAdminPrices } from "../actions/prices";

interface PRODUCTS_INITIAL_STATE {
  adminPrices: StripePrice[];
  status: REDUX_STATES;
  error: null;
  dashboardPrices: StripePrice[];
}

const initialState: PRODUCTS_INITIAL_STATE = {
  adminPrices: [],
  dashboardPrices: [],
  status: REDUX_STATES.IDLE,
  error: null,
};

const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<PRODUCTS_INITIAL_STATE>) {
    builder.addCase(getAdminPrices.fulfilled, (state, action) => {
      state.adminPrices = action.payload.prices;
      state.status = REDUX_STATES.SUCCEEDED;
      state.error = null;
      return state;
    });
		builder.addCase(clearAdminPrices.fulfilled, (state) => {
			state.adminPrices = []
			state.status = REDUX_STATES.IDLE;
			state.error = null;
			return state;
		})
  },
});

export default pricesSlice.reducer;
