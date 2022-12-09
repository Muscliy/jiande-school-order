<template>
  <tosb-layout>
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="text-40 p-1">{{ title }}</text>
    </view>
    <view class="tosb-uploader">
      <view class="tosb-uploader-content"></view>
    </view>
    <tosb-icon></tosb-icon>
    <van-button type="info">信息</van-button>
  </tosb-layout>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss">
.tosb-uploader {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 100rpx;
  min-height: 100rpx;

  &-content {
    position: relative;
    width: 100%;
    border: 1rpx dashed #0076ff;
    border-radius: 8rpx;
    overflow: hidden;

    & > div {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 8rpx;
      overflow: hidden;
    }

    &-loading {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .add {
      position: relative;
      width: 80rpx;
      height: 80rpx;
      color: #ccc;
      // border: 4rpx solid #0076ff;
      // border-radius: 50%;
    }

    // .add::before {
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   width: 22rpx;
    //   margin-top: -2rpx;
    //   margin-left: -11rpx;
    //   border-top: 4rpx solid #0076ff;
    //   content: '';
    //   box-sizing: border-box;
    // }

    // .add::after {
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   height: 22rpx;
    //   margin-top: -11rpx;
    //   margin-left: -2rpx;
    //   border-left: 4rpx solid #0076ff;
    //   content: '';
    //   box-sizing: border-box;
    // }
  }

  .icon-delete {
    top: -20rpx;
    right: -20rpx;
    width: 44rpx;
    height: 44rpx;
  }
}
</style>
