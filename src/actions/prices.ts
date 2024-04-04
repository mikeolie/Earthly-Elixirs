import axios, { type AxiosResponse } from "axios";

import baseUrl from "../config/baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdatePriceInput } from "../@types";

const url = `${baseUrl}/prices`;

export const GET_ADMIN_PRICES = "GET_ADMIN_PRICES";
export const getPrices = createAsyncThunk(
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

export const GET_PRICE_BY_ID = "GET_PRICE_BY_ID";
export const getPriceByID = createAsyncThunk(
  GET_PRICE_BY_ID,
  async (priceId: string, { rejectWithValue }) => {
    try {
      const getPriceURL = `${url}/${priceId}`;
      const response = await axios.get(getPriceURL);
      return response.data;
    } catch (error) {
      return rejectWithValue({ data: error });
    }
  }
);

export const UPDATE_PRICE = 'UPDATE_PRICE';
export const updatePrice = createAsyncThunk(
  UPDATE_PRICE,
  async (data: UpdatePriceInput, { rejectWithValue }) => {
    try {
      const updatePriceURL = `${url}`
      const response = await axios.put(updatePriceURL, data)
      return response.data;
    } catch (error) {
      return rejectWithValue({ data: error });
    }
  }
)

export const CLEAR_ADMIN_PRICES = "CLEAR_ADMIN_PRICES";
export const clearPrices = createAsyncThunk(
  CLEAR_ADMIN_PRICES,
  async () => {}
);
