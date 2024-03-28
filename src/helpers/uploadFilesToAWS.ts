import ReactS3Client from "react-aws-s3-typescript";
import config from "../config/aws";

const uploadFilesToAws = async (imagesToUpload: Array<File>) => {
  const s3 = new ReactS3Client(config);
  return new Promise((resolve) => {
    const dataLocations = imagesToUpload.map(async (image) => {
      const res = await s3
        .uploadFile(
          image,
          image.name.replace(/\.[^/.]+$/, "").replace(/[^A-Z0-9]+/gi, "_")
        )
        .catch((err) => err);
      return res.location;
    });
    resolve(dataLocations);
  });
};

export default uploadFilesToAws;
