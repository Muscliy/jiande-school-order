export const EnvMap = {
  Develop: "develop",
  Trial: "trial",
  Release: "release",
};

/*
 * BaseUrl 配置
 * develop  开发版
 * trial    体验版
 * release  正式版
 */
export const BaseUrlMap = {
  // develop: 'https://gateway.wlhyos.gray.xiaokuaikeji.com',
  // develop: 'https://gateway.wlhyos.test.xiaokuaikeji.com',
  develop: "https://driver.wlhyos.test.xiaokuaikeji.com",
  trial: "https://driver.wlhyos.test.xiaokuaikeji.com",
  release: "https://driver.wlhyos.com",
};

export const createBaseUrl = function () {
  // eslint-disable-next-line no-undef
  const env = __wxConfig?.envVersion || "develop";
  return BaseUrlMap[env];
};

// export const BASE_TOKEN = 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='

// api 白名单 请求使用 BASE_TOKEN
// const WHITE_LIST_API = ['sendCode', 'oauth/token', 'login/register']
//
// export function checkWhiteListApi(url) {
//   for (let i = 0; i < WHITE_LIST_API.length; i++) {
//     if (url.includes(WHITE_LIST_API[i])) return true
//   }
// }

export const currentVersion = "1.0.2";
