export interface User {
  username: string;
  password: string;
}

export interface StripePrice {
  active: boolean;
  billing_schema: string;
  created: number;
  currency: string;
  currency_options: null | string[];
  custom_unit_amount: null | string;
  deleted: boolean;
  id: string;
  livemode: boolean;
  lookup_key: string;
  metadata: null | string;
  nickname: string;
  object: string;
  product: null | StripeProduct;
  recurring: null | boolean;
  tax_behavior: string;
  tiers: null | string;
  tiers_mode: string;
  transform_quantity: null | string;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface StripeProduct {
  id: string;
  object: string;
  active: true;
  created: number;
  default_price: StripePrice;
  description: null | string;
  images: string[];
  features: unknown[];
  livemode: false;
  metadata: Record<string, string>;
  name: string;
  package_dimensions: null | string;
  shippable: null | string;
  statement_descriptor: null | string;
  tax_code: null | string;
  unit_label: null | string;
  updated: number;
  url: null | string;
}

export enum REDUX_STATES {
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILURE = "FAILURE",
  IDLE = "IDLE",
}

export enum PRODUCT_CATEGORY {
  TOPICALS = "topicals",
  GUMMIES = "gummies",
  TINCTURES = "tinctures",
  OILS = "oils",
  CAPSULES = "capsules",
}

export interface ProductFormData {
  productName: string;
  unitAmount: number;
  recurring: boolean;
  images: string[];
  imagesToUpload: ImageState[];
  category: string;
  description: string;
}

export interface CreateProductInput {
  productName: string;
  unitAmount: number;
  recurring: boolean;
  images: string[];
  category: string;
  description: string;
}

export enum SNACKBAR_STATUSES {
  "ERROR" = "error",
  "SUCCESS" = "success",
  "WARNING" = "warning",
  "INFO" = "info",
}

interface DefaultAxiosResponseMeta {
  arg: unknown;
  requestId: string;
  requestStatus: string;
}

export interface DefaultAxiosResponse {
  error?: unknown;
  meta: DefaultAxiosResponseMeta;
  payload: unknown;
  type: string;
}

export interface ImageState {
  file: File;
  id: number;
  src: string;
}

export interface UpdatePriceInput {
  priceId: string;
  productId: string;
  unitAmount: number;
}

export interface StripeProductResponse {
  product: StripeProduct;
  message: string;
}
export interface StripePriceResponse {
  price: StripePrice;
  message: string;
}

export interface UpdateProductInput {
  productId: string;
  productName?: string;
  category?: string;
  images?: string[];
}
