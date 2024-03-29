import { useState } from "react";

import Button from "@mui/material/Button";

import ProductForm from "../../components/ProductForm";
import DefaultSnackbar from "../../common/DefaultSnackbar";

import {
  CreateProductInput,
  DefaultAxiosResponse,
  ImageState,
  ProductFormData,
  SNACKBAR_STATUSES,
} from "../../@types";
import { INITIAL_PRODUCT_FORM } from "../../constants";
import uploadFilesToAws from "../../helpers/uploadFilesToAWS";
import { useAppDispatch } from "../../config/hooks";
import { CREATE_PRODUCT, createProduct } from "../../actions/products";

function CreateProductPage(): JSX.Element {
  const [formData, updateFormData] =
    useState<ProductFormData>(INITIAL_PRODUCT_FORM);
  const [imagesToUpload, updateImagesToUpload] = useState<ImageState[]>([]);
  const [isSnackbarOpen, toggleSnackbar] = useState<boolean>(false);
  const [isLoading, toggleLoading] = useState<boolean>(false);
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
  const handleFormUpdate = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ): void => {
    const copyOfState = JSON.parse(JSON.stringify(formData));
    copyOfState[key] = value;
    updateFormData(copyOfState);
  };
  const handleCreateProduct = async (): Promise<void> => {
    toggleLoading(true)
    const uploadedImages = (await uploadFilesToAws(imagesToUpload)) as never;
    const resolvedFiles = await Promise.all(uploadedImages);
    const createProductInput: CreateProductInput = {
      productName: formData.productName,
      unitAmount: parseInt(formData.unitAmount.toString(), 10),
      images: resolvedFiles,
      recurring: false,
      category: formData.category,
      description: formData.description,
    };
    const response: DefaultAxiosResponse = await dispatch(
      createProduct(createProductInput)
    );
    toggleLoading(false)
    if (response.type !== `${CREATE_PRODUCT}/fulfilled`) {
      showSnackbar(
        "Unable to create product, please contact Mike",
        SNACKBAR_STATUSES.ERROR
      );
      return;
    }
    showSnackbar("Successfully created product", SNACKBAR_STATUSES.SUCCESS);
    updateFormData(INITIAL_PRODUCT_FORM);
    updateImagesToUpload([])
  };
  const handleCreateProductClick = (): void => {
    void handleCreateProduct().then().catch();
  };
  const isReady =
    formData.productName.length > 2 &&
    parseInt(formData.unitAmount.toString(), 10) > 0 &&
    formData.category !== "" &&
    imagesToUpload.length > 0;
  return (
    <div>
      <nav></nav>
      <main className="flex flex-col">
        <header>Create Product</header>
        <ProductForm
          data={formData}
          handleFormUpdate={handleFormUpdate}
          imagesToUpload={imagesToUpload}
          updateImagesToUpload={updateImagesToUpload}
        />
        <Button
          onClick={handleCreateProductClick}
          variant="contained"
          disabled={!isReady || isLoading}
          color="success"
        >
          Create Product
        </Button>
      </main>
      <DefaultSnackbar
        setSnackbar={toggleSnackbar}
        isOpen={isSnackbarOpen}
        severity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </div>
  );
}

export default CreateProductPage;
