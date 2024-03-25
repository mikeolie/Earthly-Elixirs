
import { type ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { REDUX_STATES, StripePrice } from "../@types";
import { clearprices, getprices } from "../actions/prices";

interface PRODUCTS_INITIAL_STATE {
  prices: StripePrice[];
  status: REDUX_STATES;
  error: null;
  dashboardPrices: StripePrice[];
}

const initialState: PRODUCTS_INITIAL_STATE = {
  prices: [],
  dashboardPrices: [],
  status: REDUX_STATES.IDLE,
  error: null,
};

const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<PRODUCTS_INITIAL_STATE>) {
    builder.addCase(getprices.fulfilled, (state, action) => {
      state.prices = action.payload.prices;
      state.status = REDUX_STATES.SUCCEEDED;
      state.error = null;
      return state;
    });
		builder.addCase(clearprices.fulfilled, (state) => {
			state.prices = []
			state.status = REDUX_STATES.IDLE;
			state.error = null;
			return state;
		})
  },
});

export default pricesSlice.reducer;
