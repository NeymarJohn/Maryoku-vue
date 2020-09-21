import S3 from 'aws-s3';
 
class S3Service {
  fileUpload(file, fileName, dirName) {
    const config = {
      bucketName: process.env.S3_BUCKET_NAME,
      dirName: dirName, /* optional */
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESSKEY,
      secretAccessKey: process.env.AWS_SECRETKEY,
      s3Url: process.env.S3_URL, /* optional */
    }
    const S3Client = new S3(config);
    const newFileName = 'my-awesome-file';
    
    return new Promise((resolve, reject)=> {
      S3Client
        .uploadFile(file, fileName).finally(res=>{
          console.log(res)
          resolve()
        })

        // finally(()=>{
        //   resolve()
        // })
    })
  }
}

export default new S3Service();