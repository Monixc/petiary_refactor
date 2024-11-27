const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const {
  CloudFrontClient,
  CreateInvalidationCommand,
} = require("@aws-sdk/client-cloudfront");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const cloudFrontClient = new CloudFrontClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

interface ContentTypes {
  [key: string]: string;
}

async function uploadDir(s3Path: string, bucketName: string): Promise<void> {
  const files = fs.readdirSync(s3Path);

  for (const file of files) {
    const filePath = path.join(s3Path, file);
    if (fs.statSync(filePath).isDirectory()) {
      await uploadDir(filePath, bucketName);
    } else {
      const fileStream = fs.createReadStream(filePath);
      const uploadParams = {
        Bucket: bucketName,
        Key: filePath.replace("out/", ""),
        Body: fileStream,
        ContentType: getContentType(filePath),
      };

      try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log(`Successfully uploaded ${filePath}`);
      } catch (err) {
        console.error(`Error uploading ${filePath}:`, err);
      }
    }
  }
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes: ContentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  return contentTypes[ext] || "application/octet-stream";
}

async function invalidateCache(): Promise<void> {
  if (!process.env.CLOUDFRONT_DISTRIBUTION_ID) {
    throw new Error(
      "CLOUDFRONT_DISTRIBUTION_ID environment variable is not defined"
    );
  }

  const params = {
    DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: String(new Date().getTime()),
      Paths: {
        Quantity: 1,
        Items: ["/*"],
      },
    },
  };

  try {
    await cloudFrontClient.send(new CreateInvalidationCommand(params));
    console.log("CloudFront cache invalidation created");
  } catch (err) {
    console.error("CloudFront cache invalidation failed:", err);
    throw err;
  }
}

async function deploy(): Promise<void> {
  if (!process.env.S3_BUCKET) {
    throw new Error("S3_BUCKET environment variable is not defined");
  }

  try {
    await uploadDir("out", process.env.S3_BUCKET);
    console.log("S3 upload completed successfully");

    await invalidateCache();
    console.log("Deployment completed successfully");
  } catch (err) {
    console.error("Deployment failed:", err);
    process.exit(1);
  }
}

deploy();
