import React, { useState } from "react";

import { imageTypes } from "../../constants";

interface ImageUploaderProps {
  file: File | null;
  index: number;
  setFile: (file: File, index: number) => void;
}

const acceptImageTypes = imageTypes.join(",");

function ImageUploader({
  index,
  file,
  setFile,
}: ImageUploaderProps): JSX.Element {
  const initialImageURL: string | undefined =
    file !== null ? URL.createObjectURL(file) : undefined;
  const [imageURL, setImageURL] = useState<string | undefined>(initialImageURL);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.currentTarget.files;
    if (files !== null) {
      const file = files[0];
      setImageURL(URL.createObjectURL(file));
      setFile(file, index);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col">
      {imageURL !== undefined && (
        <img style={{ width: "10%" }} src={imageURL} />
      )}
      <input
        accept={acceptImageTypes}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageUploader;
