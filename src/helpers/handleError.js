import Vue from "vue";
import { isError, isString, isObject } from "lodash-es";
import { clearStorageSync } from "@/helpers/storage";

export const ErrorCodeEnum = {
  TOKEN_ILLEGAL: "RBAC000", // 令牌不存在或已失效
  USER_NOT_EXITS: "RBAC001", // 用户不存在
  PASSWORD_ERROR: "RBAC002", // 密码或验证码错误
  PERMISSION_ILLEGAL: "RBAC003", // 权限不足，请联系管理员
  SYSTEM_OVERDUE: "RBAC005", // 系统已到期
  NEED_LOGIN: "NEED_LOGIN", // 系统已到期
};

function showMessage(message) {
  uni.showToast({
    title: message,
    duration: 2000,
    mask: true,
    icon: "none",
    position: "top",
  });
}

function isErrorLike(error) {
  if (isObject(error) && error.message && error.stack) {
    return true;
  }
  return false;
}

function handleError(error, callback) {
  if (callback) return callback();

  if (isError(error) || isErrorLike(error)) {
    // 上报错误 或者 弹出一个固定的错误
    //  RangeError, ReferenceError, SyntaxError, TypeError 等等应该上传错误监控
    // TODO 集成Sentry等
    showMessage(error.message);
    return;
  }

  if (isString(error)) {
    return showMessage(error);
  }

  if (isObject(error)) {
    // TODO 这里处理 401 403
    if (error.statusCode !== 200) {
      showMessage(`服务错误，请稍后再试`);
    } else {
      const { code } = error.data;
      const { biz_code } = error.data;
      if (
        code === ErrorCodeEnum.TOKEN_ILLEGAL ||
        biz_code === ErrorCodeEnum.NEED_LOGIN
      ) {
        showMessage("登录已失效，请重新登录");
        clearStorageSync();
        setTimeout(() => {
          uni.reLaunch({ url: "/pages/login/login" });
        }, 1500);
      } else {
        showMessage(error.data.message);
      }
    }
  }
}

Vue.prototype.$handleError = handleError;
export default handleError;
