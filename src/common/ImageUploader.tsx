import { useCallback } from "react";

import Dropbox from "./Dropbox";

import validateFile from "../helpers/validateFile";
import { ImageState } from "../@types";

interface ImageUploaderProps {
  handleUpdateImages: React.Dispatch<React.SetStateAction<ImageState[]>>;
  imagesToUpload: ImageState[];
}

function ImageUploader({
  handleUpdateImages,
  imagesToUpload,
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

  return (
    <section className="flex flex-auto">
      <Dropbox
        files={imagesToUpload}
        removeQueuedImage={removeQueuedImage}
        onDrop={handleOnDrop}
      />
    </section>
  );
}

export default ImageUploader;
