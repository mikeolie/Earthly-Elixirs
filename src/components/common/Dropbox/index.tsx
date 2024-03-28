import { RefCallback } from "react";
import { useDropzone } from "react-dropzone";

import Button from "@mui/material/Button";

import Container from "./StyledDropbox";
import ImageUploadPreview from "./ImageUploadPreview";
import { ImageState } from "../../../@types";

type DROPBOX_PROPS = {
  files: Array<ImageState>;
  onDrop: RefCallback<Array<File>>;
  removeQueuedImage: (image: ImageState) => void;
};

function Dropbox({
  files,
  onDrop,
  removeQueuedImage,
}: DROPBOX_PROPS): JSX.Element {
  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });
  const uploadedfiles =
    files.length > 0 &&
    files.map((image) => (
      <ImageUploadPreview
        removeQueuedImage={removeQueuedImage}
        key={image.id}
        image={image}
      />
    ));
  return (
    <section className="dropbox-container">
      {files.length > 0 && <header>Pending Images</header>}
      {files.length > 0 && (
        <section className="image-upload__container">{uploadedfiles}</section>
      )}
      <Container
        className="dropbox"
        {...getRootProps({ isDragAccept, isFocused, isDragReject })}
      >
        <input
          id="image-dropbox__input"
          style={{ display: "flex" }}
          {...getInputProps()}
        />
        <p>Drag n drop files here</p>
        <Button
          onClick={() => {
            open();
          }}
        >
          Click To Select File
        </Button>
      </Container>
    </section>
  );
}

export default Dropbox;
