import axios, { type AxiosResponse } from "axios";

import baseUrl from "../config/baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProductInput, UpdateProductInput } from "../@types";
import { HOME_CATEGORY_KEY } from "../constants";

const url = `${baseUrl}/products`;

export const GET_ADMIN_PRODUCTS = "GET_ADMIN_PRODUCTS";
export const getAdminProducts = createAsyncThunk(
  GET_ADMIN_PRODUCTS,
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios.get(`${url}/admin`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ data: err });
    }
  }
);

export const GET_PRODUCTS = "GET_PRODUCTS";
export const getProducts = createAsyncThunk(
  GET_PRODUCTS,
  async (_, { rejectWithValue }) => {
    try {
      const category = localStorage.getItem(HOME_CATEGORY_KEY)
      // Set your custom headers
      const headers = {
        'Content-Type': 'application/json',
        'category': category || '', // Set category header
      };

      const res: AxiosResponse = await axios.get(url, { headers })
      return res.data
    } catch (err) {
      return rejectWithValue({ data: err });
    }
  }
);

export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";
export const clearProducts = createAsyncThunk(
  CLEAR_PRODUCTS,
  async () => {}
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

export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const getProductByID = createAsyncThunk(
  GET_PRODUCT_BY_ID,
  async (productId: string, { rejectWithValue }) => {
    try {
      const getProductURL = `${url}/${productId}`;
      const response = await axios.get(getProductURL);
      return response.data;
    } catch (error) {
      return rejectWithValue({ data: error });
    }
  }
);

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const deleteProduct = createAsyncThunk(
  DELETE_PRODUCT,
  async (productId: string, { rejectWithValue }) => {
    try {
      const deleteProductURL = `${url}/${productId}`;
      const response = await axios.delete(deleteProductURL);
      return response.data;
    } catch (error) {
      return rejectWithValue({ data: error });
    }
  }
);

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const updateProduct = createAsyncThunk(
  UPDATE_PRODUCT,
  async (productData: UpdateProductInput, { rejectWithValue }) => {
    try {
      const updateProductURL = `${url}`;
      const response = await axios.put(updateProductURL, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue({ data: error });
    }
  }
);
