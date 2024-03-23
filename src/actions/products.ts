import axios, { type AxiosResponse } from "axios";

import baseUrl from "../config/baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = `${baseUrl}/products`;

export const GET_ADMIN_PRODUCTS = "GET_ADMIN_PRODUCTS";
export const getAdminProducts = createAsyncThunk(
  GET_ADMIN_PRODUCTS,
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios.get(url);
      return res.data;
    } catch (err) {
      return rejectWithValue({ data: err });
    }
  }
);

export const CLEAR_ADMIN_PRODUCTS = "CLEAR_ADMIN_PRODUCTS";
export const clearAdminProducts = createAsyncThunk(
  CLEAR_ADMIN_PRODUCTS,
  async () => {}
);
