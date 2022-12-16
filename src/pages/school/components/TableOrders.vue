<template>
  <view class="h-full">
    <tosb-table
      :tableHeight="tableHeight()"
      :columns="tableColumns"
      :dataList="dataList"
      :getListLoading="getListLoading"
      @clicklistitem="handleClickItem"
    />
  </view>
</template>

<script>
import { queryOrderListApi } from "@/apis/order";
import { OrderStatusStrMap } from "@/helpers/constants";
import { parseTime } from "@/utils/time";
import { commonMod } from "@/store";

export default {
  data() {
    return {
      tableColumns: [], // table 表头参数
      dataList: [], // 学校数组
      pageNum: 1,
      pageSize: 20,
      pageCount: 1,
      getListLoading: false,
    };
  },

  mounted() {
    this.tableColumns = [
      {
        title: "编号",
        key: "orderId",
        width: "40px",
      },
      {
        title: "日期",
        key: "time",
        width: "80px",
      },
      {
        title: "报修内容",
        key: "orderContent",
        width: this.cellWidth(),
      },
      {
        title: "结果",
        key: "orderStatusStr",
      },
    ];
    this.getList();
  },
  methods: {
    cellWidth() {
      const { systemInfo } = commonMod;
      return `${systemInfo.windowWidth - 220}px`;
    },
    tableHeight() {
      const { systemInfo } = commonMod;
      return `${systemInfo.windowHeight - 60}px`;
    },
    async getList() {
      try {
        const { pageNum, pageSize, pageCount, dataList, getListLoading } = this;
        if (pageNum > pageCount) return;
        if (getListLoading) return;
        this.getListLoading = true;

        const res = await queryOrderListApi({
          pageSize: pageSize,
          pageNum: pageNum,
          orderByColumn: "orderId",
          isAsc: "desc",
        });
        const rows = [];
        res.rows.forEach((item) => {
          item.orderStatusStr = OrderStatusStrMap[item.orderStatus];
          item.time = parseTime(item.createTime, "yyyy-MM-dd");
          rows.push(item);
        });
        this.dataList = dataList.concat(rows);
        this.pageCount = res.total / pageSize;
        this.getListLoading = false;
        this.pageNum = res.rows.length > 0 ? pageNum + 1 : pageNum;
      } catch (e) {
        this.getListLoading = false;
        console.log(e);
      }
    },
    handleClickItem(event) {
      console.log(event);
      const { item } = event.detail.value;
      uni.navigateTo({
        url: `/pages/order-detail/index?orderId=${item.orderId}`,
      });
    },
  },
};
</script>
