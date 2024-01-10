const AWS = require("aws-sdk");
const Document = require("../schema/document");

require("dotenv").config();

s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

let getFileFromAws = async (boxId, fileName) => {
  try {
    let filePath = `${boxId}/${fileName}`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
    };
    const { Metadata } = await s3.headObject(params);
    const data = await s3.getObject(params).promise();
    const startDate = Metadata["start-date"]
      ? new Date(Metadata["start-date"])
      : null;
    const endDate = Metadata["start-date"]
      ? new Date(Metadata["end-date"])
      : null;
    const currentDate = new Date();
    if (startDate && currentDate < startDate) {
      return res.status(403).send("File access outside the allowed date range");
    }
    if (endDate && currentDate > endDate) {
      return res.status(403).send("File access outside the allowed date range");
    }
    // Skip date range check if the start date is null
    // if (startDate && (currentDate < startDate || currentDate > endDate)) {
    //   return res.status(403).send('File access outside the allowed date range');
    // }
    return Buffer.from(data.Body).toString("base64");
  } catch (error) {
    return console.log(
      `Error while downloading file to aws - ${error.message}`
    );
  }
};

let uploadToAws = async (userId, files, boxId, startDate, endDate) => {
  let MetaData = {};

  try {
    if (startDate) {
      MetaData["start-date"] = new Date(startDate).toISOString();
    }

    if (endDate) {
      MetaData["end-date"] = new Date(endDate).toISOString();
    }
    for (const file of files) {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${boxId}/${file.originalname}`,
        Body: file.buffer,
        ACL: "public-read-write",
        ContentType: "image/jpg/pdf",
        MetaData,
      };

      const fileInfo = await s3.upload(params).promise();
      if (Object.keys(fileInfo).length !== 0) {
        await Document.create({
          createdBy: userId,
          fileName: file.originalname,
          filePath: fileInfo.Location,
          boxId: boxId,
          startDate,
          endDate,
        });
      } else {
        console.log(
          `Error uploading file - ${file.fileName} : got ${fileInfo}`
        );
        return;
      }
    }
  } catch (error) {
    return console.log(`Error while uploading file to aws - ${error.message}`);
  }
};

let deleteFromAws = async (boxId, fileName, fileId) => {
  try {
    let filePath = `${boxId}/${fileName}`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
    };
    const data = await s3.deleteObject(params).promise();
    if (data) {
      await Document.deleteOne({ _id: fileId });
    }
    console.log("File deleted successfully");
  } catch (error) {
    return console.log(`Error while uploading file to aws - ${error.message}`);
  }
};

module.exports = { uploadToAws, deleteFromAws, getFileFromAws };
