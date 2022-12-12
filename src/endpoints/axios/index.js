import { createBaseUrl, EnvMap } from "@/config";
import { getTokenSync } from "@/helpers/storage";
import Axios from "./Axios";

const instance = new Axios({
  baseURL: createBaseUrl(),
  header: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export function composeRequestHeader() {
  let header = {};
  header["X-Mutex-Login"] = "mobile,driver,wechat,mini_program"; //小程序登录互踢
  header["X-Real-User"] = "true";
  header["X-Requested-With"] = "MiniProgramRequest"; //portal请求时要求的标识
  header["accept-language"] = "zh-CN,zh;q=0.9";
  const token = getTokenSync() || "";
  const sessionId = `JSESSIONID=${token}`;
  header["cookie"] = token ? sessionId : "";
  return header;
}

instance.interceptors.request.use(
  (config) => {
    config.header = { ...config.header, ...composeRequestHeader() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    const { code, stat } = data || {};
    if (code === 0) {
      // '0' 兼容交通上报
      return response.data;
    }
    // eslint-disable-next-line no-undef
    let env = __wxConfig?.envVersion;
    if (env !== EnvMap.Release) {
      console.log(response);
    }
    return Promise.reject(response);
  },
  (error) => {
    return Promise.reject(error.errMsg);
  }
);

export default instance;
