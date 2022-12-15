import {
  setTokenSync,
  getTokenSync,
  setCurrentUserPhoneSync,
  clearStorageSync,
} from "@/helpers/storage";

import handleError from "@/helpers/handleError";
import {
  getCurrentUserOrgType,
  getCurrentUserPhoneSync,
  setCurrentUserOrgType,
  setUserInfoSync,
} from "./storage";
import { queryOrgList } from "../apis/org";
import { OrgType } from "./constants";

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

  if (token) {
    if (orgType === OrgType.School) {
      uni.reLaunch({
        url: "/pages/school/index",
      });
    } else if (orgType === OrgType.DataCompany) {
      uni.reLaunch({
        url: "/pages/company/index",
      });
    } else if (orgType === OrgType.MaintenanceCompany) {
      uni.reLaunch({
        url: "/pages/worker/index",
      });
    } else if (orgType === OrgType.EducationBureau) {
      uni.reLaunch({
        url: "/pages/order-scan/index",
      });
    } else {
      uni.showToast({
        title: "登录无效",
        duration: 2000,
      });
    }
    syncUserOrgInfo();
  } else {
    uni.reLaunch({
      url: "/pages/login/index",
    });
  }
};

export const syncUserOrgInfo = async function () {
  try {
    const phonenumber = getCurrentUserPhoneSync();
    const res = await queryOrgList({ phonenumber });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
