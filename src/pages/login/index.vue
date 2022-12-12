<template>
  <view class="wrapper">
    <image
      class="logo"
      src="https://oss.kuaihuoyun.com/celestia/img/driver-mini-logo.png"
    ></image>
    <text class="block text-center text-40 h1">安全校园</text>
    <view class="btn-box">
      <button
        class="btn btn-green"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
      >
        <image
          class="img-weixin"
          src="https://oss.kuaihuoyun.com/celestia/img/login-weixin.png"
        ></image
        >微信登录
      </button>
    </view>
  </view>
</template>

<script>
import { wxLoginApi } from "@/apis/login";
import { loginAfterDo } from "@/helpers/login";
import {
  setCurrentJsCodeSync,
  getCurrentJsCodeSync,
  setTokenSync,
} from "@/helpers/storage";
export default {
  onShow() {
    let that = this;
    that.wxLogin().then((code) => {
      setCurrentJsCodeSync(code);
    });
  },

  methods: {
    close() {
      setIsReadAgreementSync(null);
      this.$refs.popup.close();
    },
    confirm() {
      setIsReadAgreementSync("true");
      this.$refs.popup.close();
    },
    getUserInfo(e) {
      uni.getUserProfile({
        desc: "获取用户信息",
        success: (userInfo) => {
          console.log(userInfo, "userInfo");
          uni.login({
            provider: "weixin",
            success: (loginInfo) => {
              console.log(loginInfo, "loginInfo");
            },
          });
        },
        fail: (err) => {
          console.log(err, "err");
        },
      });
    },
    async wxLogin() {
      return new Promise((resolve) => {
        // eslint-disable-next-line no-undef
        wx.login({
          success: function (res) {
            console.log("wx.login --- res ----> ", res);
            if (res.code) {
              resolve(res.code);
            } else {
              resolve(null);
            }
          },
          fail: function () {
            resolve(null);
          },
        });
      });
    },
    async getPhoneNumber(e) {
      console.log(e);
      if (e.detail.encryptedData) {
        await this.login(e);
      } else {
        uni.showToast({
          title: "获取用户信息失败，请使用其他方式登录",
          icon: "none",
        });
      }
    },
    async login(e) {
      let login_code = getCurrentJsCodeSync();
      const params = {
        code: login_code,
        encryptedDataPhone: e.detail.encryptedData,
        ivStrPhone: e.detail.iv,
      };
      uni.showLoading({
        title: "登录中…",
      });
      try {
        setTokenSync(null);
        const res = await wxLoginApi(params);
        setCurrentJsCodeSync(null);
        await loginAfterDo(res);
      } catch (error) {
        this.$handleError(error);
        this.wxLogin().then((code) => {
          setCurrentJsCodeSync(code);
        });
      }
    },
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
  background: #f5f5f5;
  .wrapper {
    height: 100%;
    padding: 0 40rpx;
    position: relative;
    .bottom {
      position: absolute;
      bottom: 40rpx;
      width: 100%;
      left: 0;
      text {
        font-size: 24rpx;
      }
    }
    .logo {
      width: 160rpx;
      height: 160rpx;
      margin: 0 auto;
      display: block;
      position: relative;
      top: 120rpx;
    }
    .img-weixin {
      width: 46rpx;
      height: 38rpx;
      display: inline-block;
      margin-right: 36rpx;
      position: relative;
      top: 6rpx;
    }
    text.h1 {
      margin-top: 144rpx;
      font-weight: 500;
      color: #333;
    }
    .btn-box {
      padding: 136rpx 0 0 0;
      .btn {
        margin-bottom: 40rpx;
      }
    }
    .btn {
      width: 100%;
      font-size: 32rpx;
      text-align: center;
      padding: 32rpx 0;
    }
    .btn::after {
      border: none;
    }
    .btn-white {
      background-color: #fff;
      color: #333;
    }
    .btn-green {
      background-color: #31ce6f;
      color: #fff;
    }
  }
  .popup-data {
    width: 100%;
    height: 460rpx;
    color: #808080;
    line-height: 56rpx;
  }
  .popup-content {
    padding: 48rpx 64rpx 48rpx 64rpx;
    box-sizing: border-box;
    background-color: #fff;
    width: 654rpx;
    height: 700rpx;
    border-radius: 16rpx;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  }
  .button-bottom {
    width: 100%;
    height: 100rpx;
    display: flex;
  }
  .popup-btn {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    position: relative;
    font-size: 36rpx;
    font-weight: 400;
  }
  .popup-btn2::before {
    position: absolute;
    border-left: 1px solid #cccccc;
    box-sizing: border-box;
    -webkit-transform-origin: center;
    transform-origin: center;
    content: " ";
    height: 48rpx;
    top: 24rpx;
    left: 0;
    pointer-events: none;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
