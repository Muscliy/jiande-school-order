<template>
  <tosb-layout>
    <van-tabs
      :active="active"
      @change="tabsChange"
      animated
      color="#0076ff"
      title-active-color="#0076ff"
      line-width="40rpx"
    >
      <van-tab title="待派单">
        <AllOrders status="1" />
      </van-tab>
      <van-tab title="已退单">
        <AllOrders status="3" />
      </van-tab>
    </van-tabs>

    <uni-fab
      :popMenu="false"
      horizontal="right"
      vertical="bottom"
      @fabClick="trigger"
    ></uni-fab>
  </tosb-layout>
</template>

<script>
import AllOrders from "./components/AllOrders.vue";
export default {
  components: {
    AllOrders,
  },
  data() {
    return {
      active: 0,
    };
  },

  methods: {
    tabsChange(event) {
      this.active = event.detail.name;
    },
    trigger() {
      uni.navigateTo({
        url: "/pages/order-scan/index",
      });
    },
  },
};
</script>
