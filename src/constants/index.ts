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


export const imageTypes = [
  'image/jpeg',
  'image/png',
  'image/vnd.microsoft.icon',
  'image/vnd.djvu',
  'image/vnd.wap.wbmp',
  'image/x-xbitmap',
  'image/x-xpixmap',
  'image/x-xwindowdump',
];

export const HOME_CATEGORY_KEY = 'category'
export const DEFAULT_CATEGORY = "All"
