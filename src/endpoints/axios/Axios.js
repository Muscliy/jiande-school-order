import InterceptorManager from "./InterceptorManager";

const defaultContentType = "application/x-www-form-urlencoded";
const CONTENT_TYPE = "Content-Type";
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.defaultContentType =
      instanceConfig.header?.[CONTENT_TYPE] || defaultContentType;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
    // TODO取消请求换成一个Map
    this.tasks = [];
    this.noop = function () {};
  }

  request(config) {
    // 处理header
    this.defaults.header = {
      ...(this.defaults.header || {}),
      ...(config.header || {}),
      [CONTENT_TYPE]: config.header?.[CONTENT_TYPE] || defaultContentType,
    };
    config.header = this.defaults.header;

    let requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(
      interceptor
    ) {
      if (
        typeof interceptor.runWhen === "function" &&
        interceptor.runWhen(config) === false
      ) {
        return;
      }

      synchronousRequestInterceptors =
        synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(
        interceptor.fulfilled,
        interceptor.rejected
      );
    });

    let responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(
      interceptor
    ) {
      responseInterceptorChain.push(
        interceptor.fulfilled,
        interceptor.rejected
      );
    });

    let promise;

    // 异步拦截器处理
    if (!synchronousRequestInterceptors) {
      let chain = [this.dispatchRequest.bind(this), undefined];
      // [inter3-ful, inter3-rej, dispatchRequest, undefined, resp1-ful, resp1-ej]
      Array.prototype.unshift.apply(chain, requestInterceptorChain);
      chain = chain.concat(responseInterceptorChain);

      promise = Promise.resolve(config);
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    // 同步拦截器处理
    let newConfig = config;
    while (requestInterceptorChain.length) {
      let onFulfilled = requestInterceptorChain.shift();
      let onRejected = requestInterceptorChain.shift();
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected(error);
        break;
      }
    }

    try {
      promise = this.dispatchRequest(newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    while (responseInterceptorChain.length) {
      promise = promise.then(
        responseInterceptorChain.shift(),
        responseInterceptorChain.shift()
      );
    }

    return promise;
  }

  dispatchRequest(config) {
    // 处理config兼容uni
    if (this.defaults.baseURL && !config.url.startsWith("http")) {
      config.url = this.defaults.baseURL + config.url;
    }
    return new Promise((resolve, reject) => {
      const task = uni.request({
        ...config,
        success(res) {
          resolve(res);
        },
        fail(error) {
          reject(error);
        },
      });
      // 用来取消请求
      this.tasks.push(task);
    });
  }

  _proxy(target, instance) {
    return new Proxy(target, {
      get(obj, prop) {
        if (prop === "abort") {
          const task = instance.tasks.pop();
          if (task) {
            return function abort() {
              task.abort();
            };
          }
          return instance.loop;
        }
        if (typeof obj[prop] === "function") {
          return obj[prop].bind(obj);
        }
        return obj[prop];
      },
    });
  }

  get(url, config) {
    // TODO 处理querystring
    return this._proxy(
      this.request({
        url,
        method: "GET",
        ...config,
      }),
      this
    );
  }

  post(url, data, config) {
    // #ifdef MP-WEIXIN
    return this._proxy(
      this.request({
        url,
        method: "POST",
        data: data,
        ...config,
      }),
      this
    );
  }
}

export default Axios;
