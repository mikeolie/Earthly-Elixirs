import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";

import ErrorPage from "../../components/ErrorPage";
import DefaultSnackbar from "../../common/DefaultSnackbar";
import ProductForm from "../../components/ProductForm";

import { useAppDispatch } from "../../config/hooks";
import { GET_PRODUCT_BY_ID, getProductByID } from "../../actions/products";
import {
  DefaultAxiosResponse,
  ImageState,
  ProductFormData,
  SNACKBAR_STATUSES,
  StripePrice,
  StripePriceResponse,
  StripeProduct,
  StripeProductResponse,
} from "../../@types";
import { GET_PRICE_BY_ID, getPriceByID } from "../../actions/prices";

function ManageProductPage(): JSX.Element {
  const [productToUpdate, setProductToUpdate] = useState<StripeProduct>();
  const [priceToUpdate, setPriceToUpdate] = useState<StripePrice>();
  const [formData, updateFormData] = useState<ProductFormData>();
  const [imagesToUpload, updateImagesToUpload] = useState<ImageState[]>([]);
  const [getProductError, setProductError] = useState<boolean>(false);
  const [isSnackbarOpen, toggleSnackbar] = useState<boolean>(false);
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<SNACKBAR_STATUSES>(
    SNACKBAR_STATUSES.INFO
  );
  const showSnackbar = (message: string, severity: SNACKBAR_STATUSES): void => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    toggleSnackbar(true);
  };
  const dispatch = useAppDispatch();
  const { productId: initialProductId } = useParams();
  const productId = initialProductId !== undefined ? initialProductId : "";
  useEffect(() => {
    const getProductToUpdate = async (): Promise<void> => {
      // Type guard to check if the payload is a StripeProduct
      const response: DefaultAxiosResponse = await dispatch(
        getProductByID(productId)
      );
      if (response.type !== `${GET_PRODUCT_BY_ID}/fulfilled`) {
        showSnackbar("Unable to load product", SNACKBAR_STATUSES.ERROR);
        setProductError(true);
        toggleLoading(false);
        return;
      } else {
        const payload = response.payload as unknown; // Assuming payload is of type any
        if (isStripeProduct(payload)) {
          const priceResponse: DefaultAxiosResponse = await dispatch(
            getPriceByID(payload.product.default_price.id)
          );
          if (priceResponse.type !== `${GET_PRICE_BY_ID}/fulfilled`) {
            showSnackbar("Unable to load product", SNACKBAR_STATUSES.ERROR);
            setProductError(true);
            toggleLoading(false);
            return;
          } else {
            if (isStripePrice(priceResponse.payload)) {
              toggleLoading(false);
              const formData: ProductFormData = {
                productName: payload.product.name,
                images: payload.product.images,
                description:
                  payload.product.description !== null
                    ? payload.product.description
                    : "",
                recurring: false,
                category: payload.product.metadata.category,
                unitAmount: priceResponse.payload.price.unit_amount,
                imagesToUpload: [],
              };
              setPriceToUpdate(priceResponse.payload.price);
              updateFormData(formData);
              setProductToUpdate(payload.product);
            }
          }
        } else {
          showSnackbar(
            "Invalid product data received",
            SNACKBAR_STATUSES.ERROR
          );
        }
      }
    };
    void getProductToUpdate();
  }, [dispatch, productId]);
  const handleFormUpdate = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ): void => {
    const copyOfState = JSON.parse(JSON.stringify(formData));
    copyOfState[key] = value;
    updateFormData(copyOfState);
  };
  const isStripeProduct = (
    payload: unknown
  ): payload is StripeProductResponse => {
    return (
      typeof payload === "object" && payload !== null && "product" in payload
    );
  };
  const isStripePrice = (payload: unknown): payload is StripePriceResponse => {
    return (
      typeof payload === "object" && payload !== null && "price" in payload
    );
  };
  const isPriceUpdated = priceToUpdate?.unit_amount !== formData?.unitAmount;
  const isCategoryUpdated =
    formData?.category !== productToUpdate?.metadata.category;
  const isNameUpdated = formData?.productName !== productToUpdate?.name;
  const isReady =
    isPriceUpdated ||
    isNameUpdated ||
    isCategoryUpdated

  const content = (): JSX.Element => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (
      productToUpdate !== undefined &&
      formData !== undefined &&
      !getProductError
    ) {
      return (
        <div>
          <section>
            <header>Manage {productToUpdate.name} </header>
          </section>
          <ProductForm
            data={formData}
            handleFormUpdate={handleFormUpdate}
            imagesToUpload={imagesToUpload}
            updateImagesToUpload={updateImagesToUpload}
          />
          <Button variant="contained" disabled={!isReady} color="success">
            Save Changes
          </Button>
        </div>
      );
    }
    return <ErrorPage />;
  };
  return (
    <div>
      {content()}
      <DefaultSnackbar
        setSnackbar={toggleSnackbar}
        isOpen={isSnackbarOpen}
        severity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </div>
  );
}

export default ManageProductPage;
