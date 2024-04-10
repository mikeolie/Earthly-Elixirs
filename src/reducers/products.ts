import { type ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { REDUX_STATES, StripeProduct } from "../@types";
import {
  clearAdminProducts,
  clearProducts,
  deleteProduct,
  getAdminProducts,
  getProducts,
} from "../actions/products";

interface PRODUCTS_INITIAL_STATE {
  adminProducts: StripeProduct[];
  products: StripeProduct[];
  status: REDUX_STATES;
  error: null;
  dashboardProducts: StripeProduct[];
}

const initialState: PRODUCTS_INITIAL_STATE = {
  adminProducts: [],
  products: [],
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
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.status = REDUX_STATES.SUCCEEDED;
      state.error = null;
      return state;
    });
    builder.addCase(clearAdminProducts.fulfilled, (state) => {
      state.adminProducts = [];
      state.status = REDUX_STATES.IDLE;
      state.error = null;
      return state;
    });
    builder.addCase(clearProducts.fulfilled, (state) => {
      state.products = [];
      state.status = REDUX_STATES.IDLE;
      state.error = null;
      return state;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const copyOfState: StripeProduct[] = JSON.parse(
        JSON.stringify(state.adminProducts)
      );
      const productId = action.payload.productId;
      const productIdx = copyOfState.findIndex(
        (product) => product.id === productId
      );
      if (productIdx > -1) {
        copyOfState.splice(productIdx, 1);
      }
      state.adminProducts = copyOfState;
      return state;
    });
  },
});

export default productsSlice.reducer;
