<template>
  <tosb-page footer>
    <van-cell title="学校">{{ order.schoolName }}</van-cell>
    <van-cell title="状态">{{ orderStatusStrMap[order.orderStatus] }}</van-cell>
    <view class="tosb-cell">
      <view style="padding-bottom: 10px"><text>报修原因</text> </view>
      <view class="van-cell__value value-class"
        ><text> {{ order.orderContent }} </text>
      </view>
    </view>
    <view
      class="tosb-cell"
      v-if="order.woOrderImgGd && order.woOrderImgGd.length > 0"
    >
      <view class="pb-16"><text class="text-muted">报修图片</text></view>
      <van-image
        v-for="(img, index) in order.woOrderImgGd"
        :key="index"
        :width="imageHeight"
        :height="imageHeight"
        lazy-load
        :src="getImageUrl(img.imgUrl)"
        :style="{ marginRight: (index + 1) % 4 === 0 ? '0px' : '10px' }"
        @click="handleImagePreview(order.woOrderImgGd, index)"
      />
    </view>

    <van-cell title="维修公司" v-if="Number(order.orderStatus) > 1">{{
      order.repairName
    }}</van-cell>

    <van-cell title="维修电话" v-if="Number(order.orderStatus) > 1">{{
      order.repairUserPhone
    }}</van-cell>

    <view class="tosb-cell" v-if="order.orderStatus > 2">
      <view class="pb-16"><text class="text-muted">维修内容</text> </view>
      <view
        ><text> {{ order.repairContent }} </text>
      </view>
    </view>
    <view
      class="tosb-cell"
      v-if="
        order.orderStatus > 2 &&
        order.woDispatchList &&
        order.woDispatchList.length > 0
      "
    >
      <view class="pb-16"><text class="text-muted">维修凭证</text></view>
      <van-image
        v-for="(img, index) in order.woOrderImgWx"
        :key="index"
        :width="imageHeight"
        :height="imageHeight"
        lazy-load
        :src="getImageUrl(img.imgUrl)"
        :style="{ marginRight: (index + 1) % 4 === 0 ? '0px' : '10px' }"
        @click="handleImagePreview(order.woOrderImgWx, index)"
      />
    </view>
    <view
      class="tosb-cell"
      v-if="
        Number(order.orderStatus) > 2 &&
        order.woOrderInfo &&
        order.woOrderInfo.length > 0
      "
    >
      <view class="pb-16"><text class="text-muted">物料清单</text></view>
      <van-image
        v-for="(img, index) in order.woOrderImgGd"
        :key="index"
        :width="imageHeight"
        :height="imageHeight"
        lazy-load
        :src="getImageUrl(img.imgUrl)"
        :style="{ marginRight: (index + 1) % 4 === 0 ? '0px' : '10px' }"
        @click="handleImagePreview(order.woOrderInfo, index)"
      />
    </view>
    <van-cell
      v-if="Number(order.orderStatus) > 1"
      title="维修历史记录"
      @click="handleRecordClick"
      is-link
    ></van-cell>
    <view slot="footer" v-if="order.orderStatus === '4'">
      <view class="flex flex-row">
        <view class="flex items-center justify-center flex-1 px-16"
          ><van-button class="w-full" block type="warning" @click="handleRest">
            返修
          </van-button></view
        >
        <view class="flex items-center justify-center flex-1 px-16">
          <van-button
            class="w-full"
            block
            type="primary"
            @click="handleConfirm"
          >
            确认
          </van-button></view
        >
      </view>
    </view>
  </tosb-page>
</template>

<script>
import { commonMod } from "@/store";
import { queryOrderApi, editOrderApi } from "@/apis/order";
import { OrderStatusStrMap } from "@/helpers/constants";
import { getCurrentUserOrgType } from "@/helpers/storage";
import { createBaseUrl } from "@/config";
export default {
  computed: {
    imageHeight() {
      const { systemInfo } = commonMod;
      return (systemInfo.windowWidth - 62) / 4;
    },
    isSchool() {
      const orgType = getCurrentUserOrgType();
      return orgType === "";
    },
  },
  data() {
    return {
      order: {},
      orderStatusStrMap: OrderStatusStrMap,
    };
  },
  async onLoad(option) {
    const { orderId } = option;
    const res = await queryOrderApi({ orderId });
    this.order = res.data.woOrder;
  },
  methods: {
    getImageUrl(path) {
      return `${createBaseUrl()}${path}`;
    },
    handleConfirm() {
      uni.showModal({
        title: "确定已完成",
        showCancel: true,
        success: async (res) => {
          try {
            await editOrderApi({
              orderId: this.order.orderId,
              orderCode: this.order.orderCode,
              orderStatus: 6,
              schoolUser: this.order.schoolUser,
              schoolName: this.order.schoolName,
              schoolUserPhone: this.order.schoolUserPhone,
            });
            uni.reLaunch({
              url: "/pages/school/index",
            });
          } catch (error) {
            this.$handleError(error);
          }
        },
      });
    },
    handleRest() {
      uni.showModal({
        title: "确定返修",
        showCancel: true,
        success: async (res) => {
          try {
            await editOrderApi({
              orderId: this.order.orderId,
              orderCode: this.order.orderCode,
              orderStatus: 3,
              schoolUser: this.order.schoolUser,
              schoolName: this.order.schoolName,
              schoolUserPhone: this.order.schoolUserPhone,
            });
            uni.reLaunch({
              url: "/pages/school/index",
            });
          } catch (error) {
            this.$handleError(error);
          }
        },
      });
    },
    handleImagePreview(images, index) {
      const imgs = [];
      images.forEach((element) => {
        imgs.push(`${createBaseUrl()}${element.imgUrl}`);
      });
      uni.previewImage({
        urls: imgs,
        current: imgs[index],
      });
    },

    handleRecordClick() {
      uni.navigateTo({
        url: `/pages/repair-records/index?orderCode=${this.order.orderCode}`,
      });
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: relative;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
