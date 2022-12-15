<template>
  <tosb-layout>
    <view
      v-for="(record, index) in records"
      :key="index"
      class="flex items-center justify-between tosb-cell"
      v-if="order.orderStatus != '1'"
    >
      <view class="pb-16"
        ><text class="text-main">{{ record.repairName }}</text>
      </view>
      <view
        ><text> {{ record.repairTime }} </text>
      </view>
    </view>
  </tosb-layout>
</template>

<script>
import { queryDispatchOrderListApi } from "@/apis/order";
export default {
  name: "RepairRecords",

  async onLoad(option) {
    const { orderCode } = option;
    const res = await queryDispatchOrderListApi({ orderCode });
    this.records = res.rows;
  },

  data() {
    return {
      records: [],
    };
  },
};
</script>
