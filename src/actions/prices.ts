import axios, { type AxiosResponse } from "axios";

import baseUrl from "../config/baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = `${baseUrl}/prices`;

export const GET_ADMIN_PRICES = "GET_ADMIN_PRICES";
export const getAdminPrices = createAsyncThunk(
  GET_ADMIN_PRICES,
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios.get(url);
      return res.data;
    } catch (err) {
      return rejectWithValue({ data: err });
    }
  }
);

export const CLEAR_ADMIN_PRICES = "CLEAR_ADMIN_PRICES";
export const clearAdminPrices = createAsyncThunk(
  CLEAR_ADMIN_PRICES,
  async () => {}
);
