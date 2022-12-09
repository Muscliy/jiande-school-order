<template>
  <view class="container">
    <van-tabs
      :active="active"
      @change="tabsChange"
      animated
      color="#0076ff"
      title-active-color="#0076ff"
      line-width="40rpx"
    >
      <van-tab title="全部">
        <view>
          <all-orders :status="0" />
        </view>
      </van-tab>
      <van-tab title="处理中">
        <view>
          <all-orders :status="1" />
        </view>
      </van-tab>
      <van-tab title="已完成">
        <view>
          <all-orders :status="2" />
        </view>
      </van-tab>
    </van-tabs>
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
      active: 0,
    };
  },
  onLoad() {},
  methods: {
    tabsChange(event) {
      this.active = event.detail.name;
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
