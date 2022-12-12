const ACCESS_TOKEN = "ACCESS_TOKEN/TOSB"; // tosb业务方token
const USER_INFO_BASE = "USER_INFO/TOSB";
const CURRENT_USER_PHONE = "CURRENT_USER_PHONE/TOSB";
const CURRENT_JS_CODE = "CURRENT_JS_CODE/TOSB";
const CURRENT_USER_ORGTYPE = "CURRENT_USER_ORGTYPE";
const CURRENT_USER_NAME = "CURRENT_USER_NAME";

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

export const setCurrentUserOrgType = (orgType) => {
  uni.setStorageSync(CURRENT_USER_ORGTYPE, orgType);
};
export const getCurrentUserOrgType = () => {
  return uni.getStorageSync(CURRENT_USER_ORGTYPE);
};
export const setCurrentUserName = (name) => {
  uni.setStorageSync(CURRENT_USER_NAME, name);
};
export const getCurrentUserName = () => {
  return uni.getStorageSync(CURRENT_USER_NAME);
};

/**
 * 持久化用户信息
 * @param {*} userInfo 用户登录信息
 * @param {*} phone 持久化key前缀，用于验证过程中退出, 使用【用户手机号码】
 */
export const setUserInfoSync = (userInfo) => {
  // const phone = userInfo.mobile || userInfo.driverPhone || getCurrentUserPhoneSync()
  const phone = userInfo ? userInfo.phonenumber : getCurrentUserPhoneSync();
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
    uni.clearStorageSync();
    //退出登录时 清空司机认证和实名认证的存储信息
    //退出登录 清空缓存时  不重新获取头像 不重复弹出用户协议 重置回原先的身份
    avatar ? uni.setStorageSync("avatar", avatar) : "";
  } catch (e) {
    // return
  }
};
