import axios from "./axios";
import { createBaseUrl } from "@/config";
import { composeRequestHeader } from "@/endpoints/axios";
/**
 * 查询货源相关
 * @param {*} params
 * @returns
 */

const UPLOAD_URL = `${createBaseUrl()}/wlhyos/basic-ability/file/uploadFile`;
export const uploadFileApi = (file) => {
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

const VAS_UPLOAD_URL = `${createBaseUrl()}/vas/portal/driver/oss/upload`;
export const uploadFileToVasApi = (file) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: VAS_UPLOAD_URL,
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

export const getThumbnailFileTemporaryUrlListApi = (filenames) => {
  return axios.post(
    "/wlhyos/basic-ability/file/getThumbnailFileTemporaryUrlList",
    {
      filenames,
      process: "resize,l_200",
    }
  );
};

export const getVasThumbnailFileTemporaryUrlListApi = (filename) => {
  return axios.post("/vas/portal/driver/oss/generate_url", {
    filename,
  });
};
