import { type ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { REDUX_STATES, StripeProduct } from "../@types";
import { clearAdminProducts, getAdminProducts } from "../actions/products";

interface PRODUCTS_INITIAL_STATE {
  adminProducts: StripeProduct[];
  status: REDUX_STATES;
  error: null;
  dashboardProducts: StripeProduct[];
}

const initialState: PRODUCTS_INITIAL_STATE = {
  adminProducts: [],
  dashboardProducts: [],
  status: REDUX_STATES.IDLE,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<PRODUCTS_INITIAL_STATE>) {
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.adminProducts = action.payload.products;
      state.status = REDUX_STATES.SUCCEEDED;
      state.error = null;
      return state;
    });
		builder.addCase(clearAdminProducts.fulfilled, (state) => {
			state.adminProducts = []
			state.status = REDUX_STATES.IDLE;
			state.error = null;
			return state;
		})
  },
});

export default productsSlice.reducer;
