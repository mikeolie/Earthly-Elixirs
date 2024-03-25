import { PRODUCT_CATEGORY, ProductFormData, User } from "../@types";

export const adminUsers: User[] = [
  { username: "maxg", password: "MGottlieb123!" },
];

export const PRODUCT_CATEGORIES: PRODUCT_CATEGORY[] = [
  PRODUCT_CATEGORY.TOPICALS,
  PRODUCT_CATEGORY.GUMMIES,
  PRODUCT_CATEGORY.TINCTURES,
  PRODUCT_CATEGORY.OILS,
  PRODUCT_CATEGORY.CAPSULES,
];

export const INITIAL_PRODUCT_FORM: ProductFormData = {
  productName: "",
  images: [],
  imagesToUpload: [],
  description: "",
  unitAmount: 0,
  recurring: false,
  category: "",
};
