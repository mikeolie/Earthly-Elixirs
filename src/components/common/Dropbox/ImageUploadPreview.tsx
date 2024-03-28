import { useState } from "react";
import { ImageState } from "../../../@types";

interface ImageUploadPreviewProps {
  image: ImageState;
  removeQueuedImage: (img: ImageState) => void;
}

function ImageUploadPreview({
  image,
  removeQueuedImage,
}: ImageUploadPreviewProps) {
  const [isHovered, setHover] = useState<boolean>(false);
  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="image-upload-thumbnail__container"
    >
      {isHovered && (
        <span
          onClick={() => removeQueuedImage(image)}
          className="btn__cancel-preview"
        >
          X
        </span>
      )}
      <img
        className="image-upload__thumbnail"
        src={image.src}
        alt={image.id.toString()}
      />
      <figcaption className="image-upload__caption">
        {image.file.name} - {image.file.size} bytes
      </figcaption>
    </figure>
  );
}

export default ImageUploadPreview;
