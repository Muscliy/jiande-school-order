import { createBaseUrl } from "@/config";
import { composeRequestHeader } from "@/endpoints/axios";

const UPLOAD_URL = `${createBaseUrl()}ma/woimgRest/uploadBannerImg`;
export const uploadFileApi = (file, formData) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: UPLOAD_URL,
      method: "POST",
      filePath: file.url,
      name: "file",
      formData: formData,
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
