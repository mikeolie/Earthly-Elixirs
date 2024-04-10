import { useCallback } from "react";

import Button from "@mui/material/Button";

import Dropbox from "./Dropbox";

import validateFile from "../helpers/validateFile";
import { ImageState } from "../@types";

interface ImageUploaderProps {
  handleUpdateImages: React.Dispatch<React.SetStateAction<ImageState[]>>;
  removeExistingImage?: (image: string) => void;
  existingImages: string[];
  imagesToUpload: ImageState[];
}

function ImageUploader({
  existingImages,
  handleUpdateImages,
  imagesToUpload,
  removeExistingImage,
}: ImageUploaderProps): JSX.Element {
  const removeQueuedImage = (image: ImageState) => {
    const newArr = imagesToUpload.filter((img) => img.id !== image.id);
    return handleUpdateImages(newArr);
  };
  const handleOnDrop = useCallback(
    (acceptedFiles: Array<File>): void => {
      acceptedFiles.forEach((file: File, index: number) => {
        const isFileValid: boolean = validateFile(file);
        if (!isFileValid) {
          return null;
        }
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          const newImage: ImageState = {
            file,
            id: index,
            src: e.target?.result as string,
          };

          handleUpdateImages((prevImages) => [...prevImages, newImage]);
        };

        reader.readAsDataURL(file);
        return file;
      });
    },
    [handleUpdateImages]
  );

  const existingImagesToRender = existingImages.map((existingImg) => {
    const handleDeleteImageClick = (): void => {
      if (removeExistingImage !== undefined) {
        removeExistingImage(existingImg);
      }
    };
    return (
      <article
        className="flex gap-4 mb-2 flex-col items-center"
        key={existingImg}
      >
        <figure className="w-2/6">
          <img src={existingImg} alt="" />
        </figure>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteImageClick}
        >
          Remove Image
        </Button>
      </article>
    );
  });

  return (
    <section className="flex flex-auto flex-col">
      <section className="flex flex-row">{existingImagesToRender}</section>
      <Dropbox
        files={imagesToUpload}
        removeQueuedImage={removeQueuedImage}
        onDrop={handleOnDrop}
      />
    </section>
  );
}

export default ImageUploader;
