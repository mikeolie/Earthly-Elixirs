import { useCallback, useState } from "react";

import Dropbox from "./Dropbox";

import validateFile from "../../helpers/validateFile";
import { ImageState } from "../../@types";

interface ImageUploaderProps {
  handleUpdateImages: (images: ImageState[]) => void;
}

function ImageUploader({
  handleUpdateImages,
}: ImageUploaderProps): JSX.Element {
  const [images, setImages] = useState<ImageState[]>([]);
  const removeQueuedImage = (image: ImageState) => {
    const newArr = images.filter((img) => img.id !== image.id);
    return setImages(newArr);
  };
  const handleOnDrop = useCallback((acceptedFiles: Array<File>): void => {
    acceptedFiles.forEach((file: File, index: number) => {
      const isFileValid: boolean = validateFile(file);
      if (!isFileValid) {
        return null;
      }
      const reader = new FileReader();
  
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImages((prevState: ImageState[]) => {
          const updatedImages = [
            ...prevState,
            {
              file,
              id: index,
              src: e.target?.result as string,
            },
          ];
          handleUpdateImages(updatedImages); // Call handleUpdateImages with the updated images array
          return updatedImages;
        });
      };
  
      reader.readAsDataURL(file);
      return file;
    });
  }, [handleUpdateImages]);

  const imagesToShow = images.map((img) => <img key={img.id} src={img.src} />);
  return (
    <section>
      <Dropbox
        files={images}
        removeQueuedImage={removeQueuedImage}
        onDrop={handleOnDrop}
      />
      {imagesToShow}
    </section>
  );
}

export default ImageUploader;
