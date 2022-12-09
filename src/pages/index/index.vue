<template>
  <tosb-layout>
    <view class="px-16 py-32">
      <view class="pb-32">
        <van-button type="info" block @click="handleClickMineOrders"
          >我的维修记录</van-button
        >
      </view>
      <van-button type="primary" block @click="handleClickCreate"
        >创建维修订单</van-button
      >
    </view>
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
  methods: {
    handleClickMineOrders() {
      uni.reLaunch({
        url: "/pages/school/index",
      });
    },
    handleClickCreate() {
      uni.reLaunch({
        url: "/pages/create/index",
      });
    },
  },
};
</script>
