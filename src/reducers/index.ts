import { combineReducers } from "@reduxjs/toolkit";

import prices from "./prices";
import products from "./products";

export default combineReducers({ prices, products });
