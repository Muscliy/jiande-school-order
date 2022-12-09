import {
  getUserBelongSync,
  setUserBelongSync,
  getLoginTokenSync,
  setLoginTokenSync,
  setPortalTokenSync,
  setCurrentUserPhoneSync,
  setTokenSync,
  setRealNameStateSync,
  getRealNameStateSync,
  setUserInfoSync,
  getUserInfoSync,
  getTokenSync,
  clearStorageSync,
  getUserIdentitySync,
} from "@/helpers/storage";
import {
  getVasAuthCodeApi,
  getVasTokenApi,
  getDriverTenantsApi,
  getWlhyAuthCodeApi,
  getWlhyTokenApi,
  queryUserInfoApi,
  updatePortalTenantApi,
} from "@/apis/login";
import handleError from "@/helpers/handleError";

const driverStatusRouter = {
  //司机认证状态跳转路由   0-失败；1-通过；2-认证中；3-未认证；  99-选择平台页
  0: "/pages/realname/result",
  1: "/pages/waybill/views/index", //swtichTab跳转方式
  2: "/pages/realname/result",
  3: "/pages/realname/index",
  99: "/pages/platform/index",
};

function jumpRouter(number) {
  setTimeout(() => {
    uni.navigateTo({
      url: driverStatusRouter[number],
    });
  }, 1000);
}

function jumpIdentityOrHome() {
  if (getUserIdentitySync()) {
    uni.switchTab({
      url: "/pages/waybill/views/index",
    });
  } else {
    uni.navigateTo({
      url: "/pages/platform/selectIdentity",
    });
  }
}

// 登录后统一处理逻辑
export const loginAfterDo = async function (res) {
  const { authorization } = res.data;
  setLoginTokenSync(`${authorization}`);
  setCurrentUserPhoneSync(res.data.mobile);
  setRealNameStateSync(res.data.identification_status);
  try {
    const vasRes = await getVasAuthCodeApi(); //登录后先获取authcode
    const params = {
      code: vasRes.data,
    };
    const tokenRes = await getVasTokenApi(params); //再用authcode 换取业务方token
    setPortalTokenSync(tokenRes.data);
    if (res.data.identification_status === 1) {
      //实名认证通过的司机 根据用户信息分发路由
      const driverTenants = await getDriverTenantsApi();
      let driverTenantsData = driverTenants.data;
      let driverTenant = driverTenantsData.tenant;
      if (driverTenant && driverTenant.tenant_id) {
        setUserBelongSync(
          driverTenant.platform_id +
            "|" +
            driverTenant.tenant_id +
            "|" +
            driverTenant.tenant_name
        ); //记录已选择的平台信息
        //如果上次已选择平台 则获取wlhy方token后跳转首页
        const wlhyCodeRes = await getWlhyAuthCodeApi();
        const wlhyRes = await getWlhyTokenApi({ code: wlhyCodeRes.data }); //换取wlhy登录token
        setTokenSync(wlhyRes.data.accessToken);
        if (!getUserInfoSync()) {
          //如果登录后没有缓存到用户信息 则重新拉取信息
          const userInfo = await queryUserInfoApi();
          setUserInfoSync(userInfo.data);
        }
        jumpIdentityOrHome();
      } else {
        //未选择平台 跳转选择平台页 number:99
        jumpRouter(99);
      }
    } else {
      //实名认证未通过的司机
      jumpRouter(res.data.identification_status);
    }
    uni.hideLoading();
  } catch (error) {
    handleError(error);
  }
};

export const loginAfterFromStart = async function () {
  const token = getLoginTokenSync();
  const realNameState = getRealNameStateSync();
  const userBelongInfo = getUserBelongSync();
  if (token) {
    //已登录根司机认证信息 跳转相应路由
    if (realNameState === 1) {
      //如果已认证
      if (userBelongInfo) {
        if (!getUserInfoSync()) {
          //如果登录后没有缓存到用户信息 则重新登录
          uni.reLaunch({
            url: "/pages/login/login",
          });
        } else {
          jumpIdentityOrHome();
        }
      } else {
        //选择平台页
        uni.navigateTo({
          url: driverStatusRouter[99],
        });
      }
    } else if (realNameState === 3) {
      //如果未认证 则重新登录
      clearStorageSync();
      uni.reLaunch({
        url: "/pages/login/login",
      });
    } else {
      jumpRouter(realNameState);
    }
  } else {
    uni.reLaunch({
      url: "/pages/login/login",
    });
  }
};

export const selectPlatformAfterDo = async function (pId, tId, tName) {
  const params = {
    tenantId: tId,
    platformId: pId,
    tenantName: tName,
  };
  try {
    setUserBelongSync(pId + "|" + tId + "|" + tName); //记录已选择的平台信息
    // if (!getTokenSync()) {
    const wlhyCodeRes = await getWlhyAuthCodeApi();
    const wlhyRes = await getWlhyTokenApi({ code: wlhyCodeRes.data }); //换取wlhy登录token
    setTokenSync(wlhyRes.data.accessToken);
    // }
    await updatePortalTenantApi(params); //更新增值业务方平台和租户id
    const userInfo = await queryUserInfoApi(); //每次更换平台 需要重新拉取并缓存userInfo信息
    setUserInfoSync(userInfo.data);
    jumpIdentityOrHome();
    uni.hideLoading();
  } catch (error) {
    handleError(error);
  }
};

export const jumpPrivacyDo = function () {
  uni.navigateTo({
    url: "/pages/webView/index?url=https://www.kuaihuoyun.com/driver-privacy.html",
  });
};

export const jumpAgreementDo = function () {
  uni.navigateTo({
    url: "/pages/webView/index?url=https://www.kuaihuoyun.com/driver-agreement.html",
  });
};
