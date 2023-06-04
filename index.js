const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client();
const BUCKET_NAME = "vouchers-mofp"; //add the bucket name here

module.exports.get = async (event) => {

  const { id } = event.pathParameters;

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `${id}.json`
  });

  try {
    const response = await s3.send(command);
    console.log(response);
    const str = await response.Body.transformToString();

    return {
      statusCode: 200,
      body: JSON.parse(str),
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 404,
      body: JSON.stringify(
        {
          message: "File not found"
        },
        null,
        2
      ),
    };
  }
};

module.exports.post = async (event) => {

  if (event.body.name === undefined || event.body.version === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Need both name and version fields"
        },
        null,
        2
      ),
    };
  }

  var buf = Buffer.from(JSON.stringify(event));

  const filename = `${event.name}-${event.version}.json`;

  var data = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'application/json',
    ACL: 'public-read'
  };

  const command = new PutObjectCommand(data);

  try {
    const response = await s3.send(command);
    console.log(response);
    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: filename
        },
        null,
        2
      ),
    };

  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Error uploading file"
        },
        null,
        2
      ),
    };
  }
};
