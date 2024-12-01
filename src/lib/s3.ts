import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: File, folder: string = "pets") {
  const fileName = `uploads/${folder}/${Date.now()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_IMAGES!,
    Key: fileName,
    Body: file,
    ContentType: file.type,
  });

  await s3Client.send(command);
  return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_IMAGES}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
}
