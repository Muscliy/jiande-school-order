import { createBaseUrl } from "@/config";
import { composeRequestHeader } from "@/endpoints/axios";

const UPLOAD_URL = `${createBaseUrl()}ma/woimgRest/uploadBannerImg`;
export const uploadFileApi = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: UPLOAD_URL,
      filePath: file.url,
      name: "file",
      formData: {
        process: "image/resize,h_150",
      },
      header: composeRequestHeader(),
      success: (res) => {
        resolve(JSON.parse(res.data));
      },
      fail(err) {
        reject(err);
      },
    });
  });
};
