const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

const s3 = new S3Client({ region: "us-east-1" }); 

module.exports.create = async (event) => {
  try {
    const file = fs.readFileSync(path.join(__dirname, "/", "doge.jpg"));
    const params = {
      Bucket: "bucket-doge",
      Key: "doge.jpg",
      Body: file,
      ACL: "public-read",
      ContentType: "image/jpeg",
    };
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `File uploaded successfully at https://${bucketName}.s3.amazonaws.com/${keyName}`,
      }),
    };
  } catch (err) {
    console.error("Error uploading to S3: ", err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Error uploading to S3!",
        error: err,
      }),
    };
  }
};

exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};
