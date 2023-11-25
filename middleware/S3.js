const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

// mynewbucketformedidek
// ap-south-1
// AKIAXDSGBYON2FQE5CUO
// SkSeInFVjHkA/M0NeDGzPYbEYm+UmHAolJzkkxQw
const bucketName = "mainmedidek"
const region = "ap-south-1"
const accessKeyId = "AKIAYYFIKK6M4D2VU7UU"
const secretAccessKey = "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"

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

exports.uploadFile = (fileBuffer, fileName, mimetype) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }
  return s3Client.send(new PutObjectCommand(uploadParams));
}

exports.deleteFile = (fileName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }
  return s3Client.send(new DeleteObjectCommand(deleteParams));
}


exports.getObjectSignedUrl = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  }
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, command);
  return url
}