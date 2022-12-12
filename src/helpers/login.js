import {
  setTokenSync,
  getTokenSync,
  setCurrentUserPhoneSync,
  clearStorageSync,
} from "@/helpers/storage";

import handleError from "@/helpers/handleError";
import {
  getCurrentUserOrgType,
  setCurrentUserOrgType,
  setUserInfoSync,
} from "./storage";

// 登录后统一处理逻辑
export const loginAfterDo = async function (res) {
  const { user } = res.data;
  if (user) {
    const { httpSessionId, phonenumber, orgType } = user;
    setTokenSync(`${httpSessionId}`);
    setCurrentUserPhoneSync(phonenumber);
    setCurrentUserOrgType(orgType);
    setUserInfoSync(user);
    loginAfterFromStart();
    uni.hideLoading();
  } else {
    uni.showToast({
      title: "登录无效",
      duration: 2000,
    });
  }
};

export const loginAfterFromStart = async function () {
  const token = getTokenSync();
  const orgType = getCurrentUserOrgType();
  // @Excel(name = "机构类型：1:学校，2:教育局，3:数字公司，4:维修公司")
  if (token) {
    if (orgType === "1") {
      uni.reLaunch({
        url: "/pages/school/index",
      });
    } else if (orgType === "4") {
      uni.reLaunch({
        url: "/pages/worker/index",
      });
    } else {
      uni.showToast({
        title: "登录无效",
        duration: 2000,
      });
    }
  } else {
    uni.reLaunch({
      url: "/pages/login/index",
    });
  }
};
