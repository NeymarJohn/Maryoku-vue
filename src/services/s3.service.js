// import S3 from "aws-s3";
import S3 from 'aws-sdk/clients/s3';
import axios from "axios";
import authHeader from "./auth-header";

const bucket = new S3(
    {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY,
        region: process.env.AWS_REGION,
    }
);

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

    fileUpload(file, fileName, dirName, ext){
        return new Promise((resolve, reject) => {
            ext = ext ? ext : file.type.split("/").pop();
            let key = `${dirName}/${fileName}.${ext}`;
            console.log('upload.key', key,process.env.S3_URL);
            /*const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                ContentType: ext,
                Body: file
            };
            const options = {
                // Part Size of 10mb
                partSize: 10 * 1024 * 1024,
                queueSize: 1,
                // Give the owner of the bucket full control
                ACL: 'bucket-owner-full-control'
            };

            const uploader = bucket.upload(params, options, function (err, data) {
                if (err) {
                    reject(err);
                }
                console.log('result', data);
                resolve(data['Location']);
            });*/

            let formData = new FormData();
            formData.append("file", file);
            formData.append("key",key);

            axios.defaults.headers.common.Authorization = authHeader().Authorization;
            const result = axios.post(`${process.env.SERVER_URL}/uploadFile`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then(result => {
                let data = result.data
                data.url = process.env.S3_URL + data.key
                resolve(data.url)
            }).catch(error => {
                reject(error)
            });
        })
    }

    deleteFile(fileName) {
        return new Promise((resolve, reject) => {
            console.log('key', fileName);
            let key = fileName.replace(process.env.S3_URL, '');

            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
            };
            bucket.deleteObject(params, function (err, data) {
                resolve();
            })
        })
    }
}

export default new S3Service();
