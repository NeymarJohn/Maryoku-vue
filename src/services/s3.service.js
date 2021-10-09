import S3 from "aws-s3";

const config = {
    bucketName: process.env.S3_BUCKET_NAME,
    dirName: null /* optional */,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
    s3Url: process.env.S3_URL /* optional */,
};

class S3Service {
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
    fileUpload(file, fileName, dirName, fileExtension) {
        config.dirName = dirName;

        const S3Client = new S3(config);
        const extenstion = fileExtension ? fileExtension : file.type.split("/").pop();
        return new Promise(async (resolve, reject) => {
            let res = await S3Client.uploadFile(file, fileName);
            console.log('fileUpload', res);
            resolve(res.location);

        });
    }

    deleteFile(fileName, dirName) {
        config.dirName = dirName;

        const S3Client = new S3(config);
        return new Promise(async (resolve, reject) => {
            let res = await S3Client.deleteFile(fileName);
            console.log('deleteFile', res);
            resolve(res);
        });
    }
}

export default new S3Service();
