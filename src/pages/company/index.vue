<template>
  <tosb-layout>
    <TableOrders />
    <!-- <view>
      <van-tabs
        :active="active"
        @change="tabsChange"
        animated
        color="#0076ff"
        title-active-color="#0076ff"
        line-width="40rpx"
      >
        <van-tab title="待派单" name="1" />
        <van-tab title="已退单" name="3" />
      </van-tabs>
    </view>

    <view v-show="active === '1'" class="flex-1" style="height: 70%">
      <AllOrders status="1" />
    </view>

    <view v-show="active === '3'" class="flex-1" style="height: 70%">
      <AllOrders status="3" />
    </view> -->
    <!--
    <uni-fab
      :popMenu="false"
      horizontal="right"
      vertical="bottom"
      @fabClick="trigger"
    ></uni-fab> -->
    <!-- <button class="fab-btn" @click="trigger">汇总</button> -->
  </tosb-layout>
</template>

<script>
// import AllOrders from "./components/AllOrders.vue";
import TableOrders from "./components/TableOrders.vue";
export default {
  components: {
    // AllOrders,
    TableOrders,
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
        url: "/pages/order-scan/index",
      });
    },
  },
};
</script>
