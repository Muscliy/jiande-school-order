import axios from "@/endpoints/axios";

export const loginApi = (params) =>
  axios.post("/vas/oauth/login", params, {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const logoutApi = (params) =>
  axios.post("/vas/oauth/logout", params, {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const getMessageApi = (params) =>
  axios.post(`/vas/oauth/sms/send`, params);

export const getPortalMessageApi = (params) =>
  axios.post(`/vas/portal/driver/user/sms/send`, params);

export const wxLoginApi = (params) =>
  axios.post(`/vas/oauth/login/wechat_mini`, params);

export const updatePasswordApi = (params) =>
  axios.post(`/vas/oauth/user/reset_pwd`, params);

export const updatePortalPasswordApi = (params) =>
  axios.post(`/vas/portal/driver/user/reset_pwd`, params);

export const updatePortalPhoneApi = (params) =>
  axios.post(`/vas/portal/driver/user/change_mobile`, params);

export const updatePortalTenantApi = (params) =>
  axios.post(`/vas/portal/driver/verify/update_user_tenant`, params);

export const queryPlatformListApi = (params) =>
  axios.post(`/vas/portal/driver/verify/query_tenants`, params);
//获取用户姓名手机号
export const queryNamePhoneApi = (params) =>
  axios.post(`/vas/portal/driver/user_info`, params);

export const getVasAuthCodeApi = (params) =>
  axios.post(`/vas/oauth/driver/auth_code`, params);

export const getWlhyAuthCodeApi = (params) =>
  axios.post(`/vas/oauth/wlhyos/auth_code`, params);

export const getWlhyTokenApi = (params) =>
  axios.post(`/wlhyos/driver-center/open/wechat/driver/login`, params);

export const getVasTokenApi = (params) =>
  axios.post(`/vas/portal/driver/login/code`, params, {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const getDriverTenantsApi = (params) =>
  axios.post(`/vas/portal/driver/verify/query_user_tenants`, params, {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const loginSmsApi = (params) =>
  axios.post("/vas/oauth/login/mobile", params, {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

// 获取个人信息
export const queryUserInfoApi = (params) =>
  axios.post(
    `/wlhyos/driver-center/driver/mine/driver/getDriverBaseInfo`,
    params
  );
