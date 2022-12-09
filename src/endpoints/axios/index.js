import { createBaseUrl, EnvMap } from "@/config";
import {
  getTokenSync,
  getLoginTokenSync,
  getPortalTokenSync,
  getUserBelongSync,
} from "@/helpers/storage";
import Axios from "./Axios";

const instance = new Axios({
  baseURL: createBaseUrl(),
  header: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export function composeRequestHeader() {
  const belongInfo = getUserBelongSync() || "";
  const platformId = belongInfo ? belongInfo.split("|")[0] : "";
  const tenantId = belongInfo ? belongInfo.split("|")[1] : "";
  let header = {};
  header["version"] = "xiaochengxu"; //wlhy业务请求 要求的标志
  header["X-Mutex-Login"] = "mobile,driver,wechat,mini_program"; //小程序登录互踢
  header["X-Real-User"] = "true";
  header["X-Requested-With"] = "MiniProgramRequest"; //portal请求时要求的标识
  header["platform-id"] = platformId;
  header["tenant-id"] = tenantId;
  header["user-type"] = 3; //当前来源 表示app/小程序标识  不可更改
  header["X-OAuth-Session-Token"] = getLoginTokenSync() || "";
  header["X-Portal-Session-Token"] = getPortalTokenSync() || "";
  header["accept-language"] = "zh-CN,zh;q=0.9";
  const token = getTokenSync() || "";
  header["Authorization"] = token ? `Bearer ${token}` : "";
  return header;
}

// function setAuthorizationHeader(config) {
//   const belongInfo = getUserBelongSync() || ''
//   const platformId = belongInfo ? belongInfo.split('|')[0] : ''
//   const tenantId = belongInfo ? belongInfo.split('|')[1] : ''
//   config.header['platform-id'] = platformId || 1
//   config.header['tenant-id'] = tenantId
//   config.header['user-type'] = 3 //当前版本默认司机角色
//   config.header['X-OAuth-Session-Token'] = getLoginTokenSync() || ''
//   config.header['X-Portal-Session-Token'] = getPortalTokenSync() || ''
//   const token = getTokenSync() || ''
//   config.header.Authorization = token ? 'Bearer ' + token : ''
// }

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
    if (
      code === "00000" ||
      code === "0" ||
      stat === "ok" ||
      code === "SUCCESS"
    ) {
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
