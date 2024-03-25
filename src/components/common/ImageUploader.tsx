import React from "react";
import AWS, { AWSError } from "aws-sdk";
import { PutObjectOutput } from "aws-sdk/clients/s3";
import { PromiseResult } from "aws-sdk/lib/request";

interface ImageUploaderProps {
  file: File | undefined;
  setFile: (file: File) => void;
}

function ImageUploader({ file, setFile }: ImageUploaderProps): JSX.Element {
  const uploadImage = async (): Promise<void> => {
    if (file) {
      const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
      const REGION = import.meta.env.VITE_S3_REGION;
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });
      const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
      };
      // Uploading file to s3

      const upload = s3.putObject(params).promise();
      await upload.then(
        (value: PromiseResult<PutObjectOutput, AWSError>): void => {
          console.log(value);
          // Fille successfully uploaded
          alert("File uploaded successfully.");
        }
      );
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.currentTarget.files;
    if (files !== null) {
      const file = files[0];
      setFile(file);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file !== undefined && <button onClick={uploadImage}>Upload</button>}
    </div>
  );
}

export default ImageUploader;
