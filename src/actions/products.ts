import axios, { type AxiosResponse } from "axios";

import baseUrl from "../config/baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProductInput } from "../@types";

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

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const createProduct = createAsyncThunk(
  CREATE_PRODUCT,
  async (data: CreateProductInput, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(url, data);
      return response.data;
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
