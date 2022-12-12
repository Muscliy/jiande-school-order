<template>
  <tosb-layout>
    <van-cell title="dsjaldsjla" @click="handleOrderClick(1)">处理中</van-cell>
    <van-cell title="dsjaldsjla" @click="handleOrderClick(2)">处理中</van-cell>

    <van-cell title="dsjaldsjla" @click="handleOrderClick(3)">处理中</van-cell>
    <van-cell title="dsjaldsjla">处理中</van-cell>
    <van-cell title="dsjaldsjla">处理中</van-cell>
    <van-cell title="dsjaldsjla">处理中</van-cell>
  </tosb-layout>
</template>

<script>
import { queryOrderListApi } from "../../../apis/order";
export default {
  name: "AllOrders",
  props: {
    status: {
      type: Number,
    },
  },
  data() {
    return {
      records: [],
    };
  },
  async onLoad() {
    const res = await queryOrderListApi({ orderStatus: this.status });
    const { rows } = res;
    this.records = rows;
  },
  methods: {
    handleOrderClick(id) {
      uni.reLaunch({
        url: `/pages/order-detail/index?orderId=${id}`,
      });
    },
  },
};
</script>
