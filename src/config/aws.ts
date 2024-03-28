interface _CONFIG {
  bucketName: string
  region: string
  accessKeyId: string
  secretAccessKey: string
}

const BUCKET_NAME = import.meta.env.VITE_S3_BUCKET
const REGION = import.meta.env.VITE_S3_REGION
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY

const config: _CONFIG = {
  bucketName: BUCKET_NAME,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
}

export default config