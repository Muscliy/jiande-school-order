const ACCESS_TOKEN = "ACCESS_TOKEN/TOSB"; // tosb业务方token
const LOGIN_TOKEN = "LOGIN_TOKEN/TOSB"; // 登录系统用到的token
const PORTAL_TOKEN = "PORTAL_TOKEN/TOSB"; // 增值业务方用到的token
const IS_READ_AGREEMENT = "IS_READ_AGREEMENT/TOSB"; // 增值业务方用到的token

const USER_IDENTITY = "USER_IDENTITY/TOSB"; // 当前用户类型 车队长:CARRIER 个体司机: PERSONAL
const REAL_NAME_STATE = "REAL_NAME_STATE/TOSB";
const USER_BELONG = "USER_BELONG/TOSB"; // 用户归属id 平台和租户
const USER_INFO_BASE = "USER_INFO/TOSB";
const CURRENT_USER_PHONE = "CURRENT_USER_PHONE/TOSB";
const CURRENT_JS_CODE = "CURRENT_JS_CODE/TOSB";

// tosb业务方token
export const setTokenSync = (token) => {
  try {
    uni.setStorageSync(ACCESS_TOKEN, token);
  } catch (error) {
    console.log(error);
  }
};

export const getTokenSync = () => {
  return uni.getStorageSync(ACCESS_TOKEN);
};

//登录系统的token
export const setLoginTokenSync = (token) => {
  uni.setStorageSync(LOGIN_TOKEN, token);
};

export const getLoginTokenSync = () => {
  return uni.getStorageSync(LOGIN_TOKEN);
};

//登录系统的token
export const setIsReadAgreementSync = (token) => {
  uni.setStorageSync(IS_READ_AGREEMENT, token);
};

export const getIsReadAgreementSync = () => {
  return uni.getStorageSync(IS_READ_AGREEMENT);
};

//增值业务方token
export const setPortalTokenSync = (token) => {
  uni.setStorageSync(PORTAL_TOKEN, token);
};

export const getPortalTokenSync = () => {
  return uni.getStorageSync(PORTAL_TOKEN);
};

// 登录的身份【司机, 车队长】
export const setUserIdentitySync = (identity) => {
  uni.setStorageSync(USER_IDENTITY, identity);
};

export const getUserIdentitySync = () => {
  return uni.getStorageSync(USER_IDENTITY);
};

// 当前实名认证状态
export const setRealNameStateSync = (state) => {
  uni.setStorageSync(REAL_NAME_STATE, state);
};

export const getRealNameStateSync = () => {
  return uni.getStorageSync(REAL_NAME_STATE);
};

// 当前所选平台和租户id  platformId|tenantId
export const setUserBelongSync = (value) => {
  uni.setStorageSync(USER_BELONG, value);
};

export const getUserBelongSync = () => {
  return uni.getStorageSync(USER_BELONG);
};

//记录当前微信登录的jscode 用于登录用
export const setCurrentJsCodeSync = (code) => {
  uni.setStorageSync(CURRENT_JS_CODE, code);
};

export const getCurrentJsCodeSync = () => {
  return uni.getStorageSync(CURRENT_JS_CODE);
};

/**
 * 记录当前登录的用户的手机号码
 * 这是用户数据的namespace
 * @param {*} phone
 */
export const setCurrentUserPhoneSync = (phone) => {
  uni.setStorageSync(CURRENT_USER_PHONE, phone);
};

export const getCurrentUserPhoneSync = () => {
  return uni.getStorageSync(CURRENT_USER_PHONE);
};

/**
 * 持久化用户信息
 * @param {*} userInfo 用户登录信息
 * @param {*} phone 持久化key前缀，用于验证过程中退出, 使用【用户手机号码】
 */
export const setUserInfoSync = (userInfo) => {
  // const phone = userInfo.mobile || userInfo.driverPhone || getCurrentUserPhoneSync()
  const phone = userInfo.user
    ? userInfo.user.mobile
    : getCurrentUserPhoneSync();
  setCurrentUserPhoneSync(phone);
  uni.setStorageSync(`${phone}_${USER_INFO_BASE}`, userInfo);
};

export const getUserInfoSync = (phone) => {
  try {
    const prefix = phone || getCurrentUserPhoneSync();
    return uni.getStorageSync(`${prefix}_${USER_INFO_BASE}`);
  } catch (error) {
    return null;
  }
};

export const clearStorageSync = () => {
  try {
    let avatar = uni.getStorageSync("avatar");
    let userIdentity = getUserIdentitySync();
    uni.clearStorageSync();
    //退出登录时 清空司机认证和实名认证的存储信息
    //退出登录 清空缓存时  不重新获取头像 不重复弹出用户协议 重置回原先的身份
    setIsReadAgreementSync("true");
    setUserIdentitySync(userIdentity);
    avatar ? uni.setStorageSync("avatar", avatar) : "";
  } catch (e) {
    // return
  }
};

// export const setStorageSync = (key, data, namespace) => {
//   try {
//     uni.setStorageSync('storage_key', 'hello')
//   } catch (e) {
//     // return
//   }
// }

// export const getStorageSync = (key, namespace) => {
//   try {
//     uni.setStorageSync('storage_key', 'hello')
//   } catch (e) {
//     // return
//   }
// }
