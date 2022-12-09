<template>
  <view class="wrapper">
    <image
      class="logo"
      src="https://oss.kuaihuoyun.com/celestia/img/driver-mini-logo.png"
    ></image>
    <text class="block text-center text-40 h1">网络货运司机</text>
    <view class="btn-box">
      <!-- <button class="btn btn-white" @click="jumpLoginSms">验证码登录</button> -->
      <!-- <button class="btn btn-white" @click="jumpLoginPwd">密码登录</button> -->
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
    <!-- <uni-popup ref="popup" type="dialog">
      <view class="popup-content">
        <text class="block mb-24 text-main text-40 font-500"
          >个人信息保护须知</text
        >
        <view class="popup-data"
          >感谢使用本产品，我们非常重视您的个人信息和隐私保护，为了更好的保障您的个人权益，在您使用本产品前请务必审慎阅读<text
            class="text-primary"
            @click="jumpAgreement"
            >《用户服务协议》</text
          ><text>及</text
          ><text class="text-primary" @click="jumpPrivacy">《隐私政策》</text
          >内的所有条款。您点击“同意并继续”的行为即表示您已阅读并同意以上协议的全部内容。
        </view>
        <view class="button-bottom">
          <view class="popup-btn">
            <text @click="close">不同意</text>
          </view>
          <view class="popup-btn popup-btn2">
            <text class="text-primary" @click="confirm">同意并继续</text>
          </view>
        </view>
      </view>
    </uni-popup>
    <view class="block text-center bottom">
      <text>登录前请充分阅读并理解</text
      ><text class="text-primary" @click="jumpAgreement">《用户服务协议》</text
      ><text>及</text
      ><text class="text-primary" @click="jumpPrivacy">《隐私政策》</text>
    </view> -->
  </view>
</template>

<script>
import { wxLoginApi } from "@/apis/login";
import { loginAfterDo, jumpAgreementDo, jumpPrivacyDo } from "@/helpers/login";
import {
  setCurrentJsCodeSync,
  getCurrentJsCodeSync,
  setIsReadAgreementSync,
  getIsReadAgreementSync,
  setTokenSync,
} from "@/helpers/storage";
export default {
  data() {
    return {};
  },
  onShow() {
    let that = this;
    let login_code = getCurrentJsCodeSync();
    if (!login_code) {
      that.wxLogin().then((code) => {
        setCurrentJsCodeSync(code);
      });
    } else {
      // eslint-disable-next-line no-undef
      wx.checkSession({
        success() {
          //console.log('success');
        },
        fail() {
          //console.log('fail');
          that.wxLogin().then((code) => {
            setCurrentJsCodeSync(code);
          });
        },
      });
    }
  },
  onLoad() {
    // if (!getIsReadAgreementSync()) {
    //   this.$refs.popup.open();
    // }
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
      // if (!getIsReadAgreementSync()) {
      //   this.$refs.popup.open();
      //   return;
      // }
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
        jsCode: login_code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        programName: "wlhy_driver",
      };
      uni.showLoading({
        title: "登录中…",
      });
      try {
        setTokenSync(null);
        const res = await wxLoginApi(params);
        setCurrentJsCodeSync(null);
        loginAfterDo(res);
      } catch (error) {
        this.$handleError(error);
        this.wxLogin().then((code) => {
          setCurrentJsCodeSync(code);
        });
      }
    },
    // jumpLoginSms() {
    //   if (!getIsReadAgreementSync()) {
    //     this.$refs.popup.open();
    //     return;
    //   }
    //   uni.navigateTo({
    //     url: "/pages/login/login-sms",
    //   });
    // },
    // jumpLoginPwd() {
    //   if (!getIsReadAgreementSync()) {
    //     this.$refs.popup.open();
    //     return;
    //   }
    //   uni.navigateTo({
    //     url: "/pages/login/login-pwd",
    //   });
    // },
    jumpAgreement() {
      jumpAgreementDo();
    },
    jumpPrivacy() {
      jumpPrivacyDo();
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
