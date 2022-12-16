<template>
  <view class="bg-gray border-b-solid">
    <view class="flex px-12">
      <view
        class="flex items-center justify-between flex-1 px-4 py-16 mx-4 border border-r"
        @click="showSchoolAction = true"
      >
        <view
          ><text class="text-muted" style="font-size: 14px">学校</text>
        </view>
        <view
          ><text style="font-size: 14px">
            {{ filter.school.orgName || "选择学校" }}
          </text>
        </view>
      </view>
      <view
        class="flex items-center justify-between flex-1 px-4 py-16 mx-4 border border-r"
        @click="showMaintenanceCompanyAction = true"
      >
        <view
          ><text class="text-muted" style="font-size: 14px">维修公司</text>
        </view>
        <view
          ><text style="font-size: 14px">
            {{ filter.maintenanceCompany.orgName || "选择公司" }}
          </text>
        </view>
      </view>
    </view>
    <view class="flex px-12 pt-16">
      <view
        class="flex items-center justify-between flex-1 px-4 py-16 mx-4 border border-r"
        @click="showBeginTimeAction = true"
      >
        <view
          ><text class="text-muted" style="font-size: 14px">开始时间</text>
        </view>
        <view
          ><text style="font-size: 14px">
            {{ getFormatTime(filter.beginTime) || "选择时间" }}
          </text>
        </view>
      </view>
      <view
        class="flex items-center justify-between flex-1 px-4 py-16 mx-4 border border-r"
        @click="showEndTimeAction = true"
      >
        <view
          ><text class="text-muted" style="font-size: 14px">结束时间</text>
        </view>
        <view
          ><text style="font-size: 14px">
            {{ getFormatTime(filter.endTime) || "选择时间" }}
          </text>
        </view>
      </view>
    </view>

    <view class="px-16 py-16">
      <view class="flex flex-row justify-end">
        <van-button
          class="mr-16"
          block
          type="warning"
          @click="handleRest"
          size="small"
        >
          重置
        </van-button>

        <van-button block type="primary" @click="handleConfirm" size="small">
          查询
        </van-button>
      </view>
    </view>
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
  </view>
</template>

<script>
import { OrderStatusStrMap, OrgType, OrderStatus } from "@/helpers/constants";
import { queryOrgList } from "@/apis/org";
import { parseTime } from "@/utils/time";

export default {
  data() {
    return {
      schools: [],
      maintenanceCompanies: [],
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
    const res1 = await queryOrgList({ orgType: OrgType.School });
    this.schools = res1.rows;
    const res2 = await queryOrgList({ orgType: OrgType.MaintenanceCompany });
    this.maintenanceCompanies = res2.rows;
  },
  methods: {
    getFormatTime(time) {
      const str = parseTime(time, "yyyy-MM-dd");
      return str;
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
      this.$emit("reset");
    },
    handleConfirm() {
      this.$emit("search", { params: this.filter });
    },
  },
};
</script>
