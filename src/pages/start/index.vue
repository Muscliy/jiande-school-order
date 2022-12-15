<template>
  <view class="wrapper">
    <image class="logo" src="/static/logo.png"></image>
    <text>平安校园</text>
  </view>
</template>

<script>
import { loginAfterFromStart } from "@/helpers/login";

export default {
  data() {
    return {
      setTimeoutFun: null,
    };
  },
  onShow() {
    console.log("dshkdhskdh");
    uni.login({
      success: (res) => {
        console.log(res.code);
      },
    });

    this.setTimeoutFun = setTimeout(() => {
      loginAfterFromStart();
    }, 1500);
  },
  onLoad() {
    this.setTimeoutFun = setTimeout(() => {
      loginAfterFromStart();
      clearTimeout(this.setTimeoutFun);
    }, 1000);
  },
  methods: {},
};
</script>

<style lang="scss">
page {
  height: 100%;
  background: #fff;
  .wrapper {
    height: 100%;
    .logo {
      width: 88rpx;
      height: 88rpx;
      position: absolute;
      bottom: 135rpx;
      left: 50%;
      margin-left: -44rpx;
    }
    text {
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 80rpx;
    }
  }
}
</style>
