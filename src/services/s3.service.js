// import S3 from "aws-s3";
// import S3 from 'aws-sdk/clients/s3';
import axios from "axios";
import authHeader from "./auth-header";

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

  fileUpload(file, fileName, dirName, ext) {
    return new Promise((resolve, reject) => {
      ext = ext ? ext : file.type.split("/").pop();
      let key = `${dirName}/${fileName}.${ext}`;
      console.log("upload.key", key, process.env.S3_URL);

      let formData = new FormData();
      formData.append("file", file);
      formData.append("path", dirName);

      axios.defaults.headers.common.Authorization = authHeader().Authorization;
      axios
        .post(`${process.env.SERVER_URL}/uploadFile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((result) => {
          let data = result.data;
          console.log("data", data);
          data.url = process.env.S3_URL + data.key;
          resolve(data.upload);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteFile(fileName) {
    return new Promise((resolve, reject) => {
      console.log("key", fileName);
      let key = fileName.replace(process.env.S3_URL, "");

      axios.defaults.headers.common.Authorization = authHeader().Authorization;
      axios
        .post(`${process.env.SERVER_URL}/uploadFile`, {
          key: fileName
        })
        .then((result) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new S3Service();
