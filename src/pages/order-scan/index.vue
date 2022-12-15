<template>
  <tosb-layout>
    <view class="flex items-center justify-end tosb-cell">
      <van-button
        class="mr-16"
        type="info"
        size="mini"
        plain
        @click="handleRest"
        >重置</van-button
      >
      <van-button type="primary" size="mini" plain @click="showPopup = true"
        >筛选</van-button
      >
    </view>
    <van-cell
      v-for="(record, index) in records"
      :key="index"
      :title="record.orderContent"
      @click="handleOrderClick(record)"
      is-link
      >{{ getStatusStr(record) }}</van-cell
    >

    <van-popup
      :show="showPopup"
      @close="showPopup = false"
      position="bottom"
      :overlay="true"
      :z-index="10"
    >
      <van-cell is-link title="学校" @click="showSchoolAction = true">{{
        filter.school.orgName
      }}</van-cell>
      <van-cell
        is-link
        title="维修公司"
        @click="showMaintenanceCompanyAction = true"
        >{{ filter.maintenanceCompany.orgName }}</van-cell
      >
      <van-cell is-link title="开始时间" @click="showBeginTimeAction = true">{{
        getFormatTime(filter.beginTime)
      }}</van-cell>
      <van-cell
        is-link
        title="结束时间"
        @click="showEndTimeAction = true"
        :disabled="!filter.beginTime"
        >{{ getFormatTime(filter.endTime) }}</van-cell
      >
      <view class="px-16 py-16">
        <view class="flex flex-row">
          <view class="flex items-center justify-center flex-1 px-16"
            ><van-button
              class="w-full"
              block
              type="warning"
              @click="handleRest"
            >
              重置
            </van-button></view
          >
          <view class="flex items-center justify-center flex-1 px-16">
            <van-button
              class="w-full"
              block
              type="primary"
              @click="handleConfirm"
            >
              查询
            </van-button></view
          >
        </view>
      </view>
    </van-popup>
    <van-popup
      :show="showSchoolAction"
      @close="showSchoolAction = false"
      position="bottom"
      :overlay="true"
      :z-index="11"
    >
      <van-picker
        :columns="schools"
        show-toolbar
        value-key="orgName"
        title="选择学校"
        @confirm="onSchoolSelect"
        @cancel="showSchoolAction = false"
      >
      </van-picker>
    </van-popup>
    <van-popup
      :show="showMaintenanceCompanyAction"
      @close="showMaintenanceCompanyAction = false"
      position="bottom"
      :overlay="true"
      :z-index="11"
    >
      <van-picker
        :columns="maintenanceCompanies"
        show-toolbar
        value-key="orgName"
        title="选择维修公司"
        @confirm="onMaintenanceCompanySelect"
        @cancel="showMaintenanceCompanyAction = false"
      >
      </van-picker>
    </van-popup>
    <van-popup
      :show="showBeginTimeAction"
      @close="showBeginTimeAction = false"
      position="bottom"
      :overlay="true"
      :z-index="11"
    >
      <van-datetime-picker
        show-toolbar
        type="date"
        :value="filter.beginTime"
        @confirm="handleBeginTimeInput"
        @cancel="showBeginTimeAction = false"
        :formatter="formatter"
        :max-date="maxDate"
        :min-date="minDate"
      />
    </van-popup>
    <van-popup
      :show="showEndTimeAction"
      @close="showEndTimeAction = false"
      position="bottom"
      :overlay="true"
      :z-index="11"
    >
      <van-datetime-picker
        v-if="filter.beginTime"
        show-toolbar
        type="date"
        :value="filter.endTime"
        @cancel="showEndTimeAction = false"
        @confirm="handleEndTimeInput"
        :formatter="formatter"
        :min-data="filter.beginTime || minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </tosb-layout>
</template>

<script>
import { queryOrderListApi } from "@/apis/order";
import { OrderStatusStrMap, OrgType, OrderStatus } from "@/helpers/constants";
import { queryOrgList } from "@/apis/org";
import { parseTime } from "@/utils/time";
import { getCurrentUserOrgType } from "@/helpers/storage";

export default {
  data() {
    return {
      schools: [],
      maintenanceCompanies: [],
      records: [],
      result: [],
      showPopup: false,
      showSchoolAction: false,
      showMaintenanceCompanyAction: false,
      showBeginTimeAction: false,
      showEndTimeAction: false,
      maxDate: new Date().getTime(),
      minDate: new Date(2022, 10, 1).getTime(),
      filter: {
        school: {},
        maintenanceCompany: {},
        beginTime: null,
        endTime: null,
      },
      formatter(type, value) {
        if (type === "year") {
          return `${value}年`;
        } else if (type === "month") {
          return `${value}月`;
        }
        return value;
      },
    };
  },
  async mounted() {
    await this.handleQueryOrders();
    const res1 = await queryOrgList({ orgType: OrgType.School });
    this.schools = res1.rows;
    const res2 = await queryOrgList({ orgType: OrgType.MaintenanceCompany });
    this.maintenanceCompanies = res2.rows;
  },
  methods: {
    getFormatTime(time) {
      return parseTime(time, "yyyy-MM-dd");
    },
    async handleQueryOrders() {
      const params = { orderByColumn: "orderId", isAsc: "desc" };
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
        params["params[beginTime]"] = this.getFormatTime(this.filter.beginTime);
        params["params[endTime]"] = this.getFormatTime(this.filter.endTime);
      }
      const res = await queryOrderListApi(params);
      const { rows } = res;
      this.records = rows;
    },
    handleOrderClick(order) {
      const orgType = getCurrentUserOrgType();
      if (
        orgType === OrgType.DataCompany &&
        order.orderStatus === OrderStatus.WaitingDispatch
      ) {
        uni.navigateTo({
          url: `/pages/dispatch/index?orderId=${order.orderId}`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/order-detail/index?orderId=${order.orderId}`,
        });
      }
    },
    getStatusStr(row) {
      return OrderStatusStrMap[row.orderStatus];
    },
    onSchoolSelect(event) {
      const { value } = event.detail;
      this.filter.school = value;
      this.showSchoolAction = false;
    },
    onMaintenanceCompanySelect(event) {
      const { value } = event.detail;
      this.filter.maintenanceCompany = value;
      this.showMaintenanceCompanyAction = false;
    },
    handleBeginTimeInput(event) {
      this.filter.beginTime = event.detail;
      this.showBeginTimeAction = false;
    },
    handleEndTimeInput(event) {
      this.filter.endTime = event.detail;
      this.showEndTimeAction = false;
    },
    handleRest() {
      this.filter = {
        school: {},
        maintenanceCompany: {},
        beginTime: null,
        endTime: null,
      };
      this.showPopup = false;
    },
    handleConfirm() {
      this.handleQueryOrders();
      this.showPopup = false;
    },
  },
};
</script>
