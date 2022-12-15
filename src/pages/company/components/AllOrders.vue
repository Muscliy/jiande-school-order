<template>
  <tosb-layout>
    <van-cell
      v-for="(record, index) in records"
      :key="index"
      :title="record.orderContent"
      @click="handleOrderClick(record.orderId)"
      is-link
      >{{ getStatusStr(record) }}</van-cell
    >
  </tosb-layout>
</template>

<script>
import { queryOrderListApi } from "@/apis/order";
import { OrderStatusStrMap } from "@/helpers/constants";
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
  async mounted() {
    const res = await queryOrderListApi({
      orderStatus: this.status,
    });
    const { rows } = res;
    this.records = rows;
  },
  methods: {
    handleOrderClick(id) {
      uni.reLaunch({
        url: `/pages/dispatch/index?orderId=${id}`,
      });
    },
    getStatusStr(row) {
      return OrderStatusStrMap[row.orderStatus];
    },
  },
};
</script>
