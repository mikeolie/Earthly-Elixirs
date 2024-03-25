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
  metadata: Record<string | number, string | number>;
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
  imagesToUpload: File[];
  category: string;
  description: string;
}
