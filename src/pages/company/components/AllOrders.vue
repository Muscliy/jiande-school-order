<template>
  <tosb-list-scroll
    :hasMore="scroll.hasMore"
    :showLoadMore="scroll.showLoadMore"
    :isLoading="scroll.isLoading"
    :isEmpty="scroll.isEmpty"
    :isPullDown="scroll.isPullDown"
    :scrollTop="scrollTop"
    @refresh="handleRefresh"
    @loadmore="handleLoadMore"
  >
    <van-cell
      v-for="(record, index) in records"
      :key="index"
      :title="record.orderContent"
      @click="handleOrderClick(record.orderId)"
      is-link
      >{{ getStatusStr(record) }}</van-cell
    >
    <!-- <template slot="empty">
    <view class="flex items-center justify-center tosb-empty">
      <text class="text-main text-28">暂无订单</text>
    </view>
  </template> -->
  </tosb-list-scroll>
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
      total: 0,
      scrollTop: -1,
      scroll: {
        pageNum: 1,
        pageSize: 20,
        isLoading: false,
        isEmpty: false,
        isPullDown: false,
        hasMore: false,
        showLoadMore: true,
      },
    };
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
    async fetchData() {
      this.scroll.isLoading = true;
      try {
        const res = await queryOrderListApi({
          orderStatus: this.status,
          pageSize: this.scroll.pageSize,
          pageNum: this.scroll.pageNum,
          orderByColumn: "orderId",
          isAsc: "desc",
        });
        const { rows } = res;
        this.total = res.total;
        this.scroll.isEmpty = this.total < 1;

        if (this.scroll.pageNum === 1) {
          this.records = rows;
        } else {
          this.records = this.records.concat(rows);
        }
        this.scroll.hasMore =
          this.total > this.scroll.pageNum * this.scroll.pageSize;
        if (this.scroll.hasMore) {
          this.scroll.pageNum = this.scroll.pageNum + 1;
        }
        this.scroll.showLoadMore = this.total > this.scroll.pageSize;
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.scroll.isPullDown = false;
        this.scroll.isLoading = false;
      }
    },
    handleRefresh() {
      this.scroll.isPullDown = true;
      this.scroll.pageNum = 1;
      this.scroll.hasMore = true;
      this.fetchData();
    },
    handleLoadMore() {
      if (this.scroll.isLoading) return;
      this.fetchData();
    },
  },
};
</script>
