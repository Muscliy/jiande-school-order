<template>
  <view class="container flex flex-col">
    <view
      ><van-tabs
        :active="active"
        @change="tabsChange"
        animated
        color="#0076ff"
        title-active-color="#0076ff"
        line-width="40rpx"
      >
        <van-tab title="全部" name="1" />
        <van-tab title="处理中" name="2"> </van-tab>
        <van-tab title="已完成" name="3"> </van-tab> </van-tabs
    ></view>
    <view v-show="active === '1'" class="flex-1" style="height: 70%">
      <AllOrders status="1" class="h-full" />
    </view>
    <view v-show="active === '2'" class="flex-1" style="height: 70%">
      <AllOrders status="2" />
    </view>
    <view v-show="active === '3'" class="flex-1" style="height: 70%">
      <AllOrders status="3" />
    </view>
    <uni-fab
      :popMenu="false"
      horizontal="right"
      vertical="bottom"
      @fabClick="trigger"
    ></uni-fab>
  </view>
</template>

<script>
import AllOrders from "./components/AllOrders.vue";
export default {
  components: {
    AllOrders,
  },
  data() {
    return {
      active: "1",
    };
  },

  methods: {
    tabsChange(event) {
      this.active = event.detail.name;
    },
    trigger() {
      uni.navigateTo({
        url: "/pages/create/index",
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  height: 100%;
  box-sizing: border-box;
  background: #f5f5f5;
  overflow-y: auto;
  .head {
    width: 100%;
    height: 40rpx;
    background: white;
  }
}
</style>
