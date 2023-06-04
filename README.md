# Config Server

This project aimed to showcase a quick demo of AWS Lambda functions. For this purpose, I've thought of emulating a configuration server

# Architecture
![image](https://vouchers-mofp.s3.amazonaws.com/awsconfig.png)

The architecture uses an API gateway so we can access both lambda functions. We also need to have an existing S3 bucket.

The lambda functions needs to have access to the S3 bucket

The following table contains references of interest for the project:
| Name  | Link  |
|---|---|
| AWS Api Gateway  | https://aws.amazon.com/api-gateway/ |
| AWS Lambda Functions  | https://aws.amazon.com/lambda |
| AWS S3  | https://aws.amazon.com/s3 |
| Serverless framework  | https://www.serverless.com/#How-It-works  |

# Prerequisites
You need to have NodeJS and Serverless framework installed. In Ubuntu, you can install them with the following commands
```
sudo apt update
sudo apt install nodejs
npm install -g serverless
```

You also need to create a S3 bucket, if you don't know how, you can follow [this guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html)

After creating the S3 bucket, you need to set the permission for the created lambda functions to access it, if you don't know how, please follow [this guide](https://repost.aws/knowledge-center/lambda-execution-role-s3-bucket)

## Usage
You will be performing two different requests:
- A POST request to upload the file. The content of the request needs to contain a name and version property, any other will be stored in the server as well
```
{
  "name": "serviceName",
  "version": 1,
  "port": 8888,
  "ssl": true
}
```


- A GET request, so we obtain the configuration needed. You just need to add the service name plus the version like this:

```
{{baseURL}}/servicename-2
```
## Deployment
in the root folder from the repository, run the following command
```
$ serverless deploy
```

