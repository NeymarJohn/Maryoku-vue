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

  fileUpload(file, fileName, dirName, fullResponse = false) {
    return new Promise((resolve, reject) => {

      let formData = new FormData();
      formData.append("file", file);
      formData.append("path", dirName);
      formData.append("name", fileName);

      axios.defaults.headers.common.Authorization = authHeader().Authorization;
      const result = axios
        .post(`${process.env.SERVER_URL}/uploadFile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((result) => {
          if (fullResponse) {
            resolve(result);
          } else {
            resolve(result.data.upload.url);
          }
        })
        .catch((error) => reject(error));
    });
  }

  downloadFiles(files) {
    const result = axios
      .post(`${process.env.SERVER_URL}/downloadFiles`, { files }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((result) => {
        // const filesName = files.map((file) => {
        //   const splittedFileURL = file.split("/");
        //   return splittedFileURL[splittedFileURL.length - 1];
        // });
        // console.log({ filesName });
        // const regExp = new RegExp(`^(${filesName.join("|")})$`);
        // const filesArrayStream = result.data.split(regExp);
        // console.log(filesArrayStream[0]);
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  }

  deleteFile(fileName) {
    return new Promise((resolve, reject) => {
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
