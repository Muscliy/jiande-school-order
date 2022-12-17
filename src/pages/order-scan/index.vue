<template>
  <tosb-layout>
    <SearchBar @reset="handleReset" @search="handleSearch" />
    <tosb-table
      :tableHeight="tableHeight()"
      :columns="tableColumns"
      :dataList="dataList"
      :getListLoading="getListLoading"
      @clicklistitem="handleClickItem"
    />
  </tosb-layout>
</template>

<script>
import { queryOrderListApi } from "@/apis/order";
import { OrderStatusStrMap } from "@/helpers/constants";
import { parseTime } from "@/utils/time";
import { commonMod } from "@/store";
import SearchBar from "./components/SearchBar";
export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      tableColumns: [], // table 表头参数
      dataList: [], // 学校数组
      pageNum: 1,
      pageSize: 20,
      pageCount: 1,
      getListLoading: false,
      filter: {
        school: {},
        maintenanceCompany: {},
        beginTime: null,
        endTime: null,
      },
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
        title: "学校",
        key: "schoolName",
      },
      {
        title: "维修单位",
        key: "repairName",
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
      return `${systemInfo.windowHeight - 210}px`;
    },
    async getList() {
      try {
        const { pageNum, pageSize, pageCount, dataList, getListLoading } = this;
        if (pageNum > pageCount) return;
        if (getListLoading) return;
        this.getListLoading = true;

        const params = {
          orderByColumn: "orderId",
          isAsc: "desc",
          pageSize: pageSize,
          pageNum: pageNum,
        };
        if (this.filter.school && this.filter.school.orgCode) {
          params.schoolCode = this.filter.school.orgCode;
        }
        if (
          this.filter.maintenanceCompany &&
          this.filter.maintenanceCompany.orgCode
        ) {
          params.repairCode = this.filter.maintenanceCompany.orgCode;
        }

        if (this.filter.beginTime && this.filter.endTime) {
          params["params[beginTime]"] = this.getFormatTime(
            this.filter.beginTime
          );
          params["params[endTime]"] = this.getFormatTime(this.filter.endTime);
        }

        const res = await queryOrderListApi(params);
        const rows = [];
        res.rows.forEach((item) => {
          item.repairName = item.repairName || "--";
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
    handleSearch(event) {
      this.filter = { ...this.filter, ...event.params };
      this.pageNum = 1;
      this.pageCount = 1;
      this.getListLoading = false;
      this.dataList = [];
      this.getList();
    },
    handleReset() {
      this.filter = {
        school: {},
        maintenanceCompany: {},
        beginTime: null,
        endTime: null,
      };
      this.getListLoading = false;
      this.pageNum = 1;
      this.pageCount = 1;
      this.dataList = [];
      this.getList();
    },
  },
};
</script>
