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
    <view class="tosb-cell" v-if="order.orderStatus != '1'">
      <view class="pb-16"><text class="text-muted">维修人员</text> </view>
      <view
        ><text> {{ order.repairName }} </text>
      </view>
    </view>
    <view class="tosb-cell" v-if="order.orderStatus != '1'">
      <view class="pb-16"><text class="text-muted">维修电话</text> </view>
      <view
        ><text> {{ order.repairUserPhone }} </text>
      </view>
    </view>

    <!-- <view class="tosb-cell" v-if="order.orderStatus > 2">
      <view class="pb-16"><text class="text-muted">维修记录</text> </view>
      <view
        ><text> {{ order.repairContent }} </text>
      </view>
    </view>
    <view class="tosb-cell" v-if="order.orderStatus > 2">
      <view class="pb-16"><text class="text-muted">维修凭证</text></view>
      <van-image
        v-for="(item, index) in images"
        :key="index"
        :width="imageHeight"
        :height="imageHeight"
        lazy-load
        :src="item"
        :style="{ marginRight: (index + 1) % 4 === 0 ? '0px' : '10px' }"
      />
    </view>
    <view class="tosb-cell" v-if="order.orderStatus > 2">
      <view class="pb-16"><text class="text-muted">物料清单</text></view>
      <van-image
        v-for="(item, index) in images"
        :key="index"
        :width="imageHeight"
        :height="imageHeight"
        lazy-load
        :src="item"
        :style="{ marginRight: (index + 1) % 4 === 0 ? '0px' : '10px' }"
        @click=""
      />
    </view> -->

    <van-cell title="选择维修公司" @click="handleSelectOrg" is-link>
      {{ (org && org.orgName) || "" }}
    </van-cell>
    <van-cell
      v-if="org && org.phonenumber"
      title="维修公司电话"
      @click="handleSelectOrg"
      is-link
    >
      {{ (org && org.phonenumber) || "" }}
    </van-cell>

    <view slot="footer">
      <view class="flex flex-row">
        <view class="flex items-center justify-center flex-1 px-16">
          <van-button
            class="w-full"
            block
            type="primary"
            @click="handleConfirm"
            :disabled="!org.orgName"
          >
            派单
          </van-button></view
        >
      </view>
    </view>
  </tosb-page>
</template>

<script>
import { commonMod } from "@/store";
import { GlobalEventName, OrderStatusStrMap } from "@/helpers/constants";
import { queryOrderApi, editOrderApi } from "@/apis/order";
import { createBaseUrl } from "@/config";
export default {
  computed: {
    imageHeight() {
      const { systemInfo } = commonMod;
      return (systemInfo.windowWidth - 62) / 4;
    },
  },
  data() {
    return {
      order: {},
      org: {},
      orderStatusStrMap: OrderStatusStrMap,
    };
  },
  async onLoad(option) {
    const { orderId } = option;
    const res = await queryOrderApi({ orderId });
    this.order = res.data.woOrder;
    uni.$on("orgSelect", (org) => {
      this.org = org;
    });
  },
  methods: {
    getImageUrl(path) {
      return `${createBaseUrl()}${path}`;
    },
    async handleConfirm() {
      try {
        await editOrderApi({
          orderCode: this.order.orderCode,
          orderId: this.order.orderId,
          orderStatus: 2,
          repairCode: this.org.orgCode,
          schoolUser: this.order.schoolUser,
          schoolName: this.order.schoolName,
          schoolUserPhone: this.order.schoolUserPhone,
        });
        uni.showToast({
          title: "派单成功",
        });
        uni.$emit(GlobalEventName.DispatchSuccess);
        uni.reLaunch({
          url: "/pages/company/index",
        });
      } catch (error) {
        this.$handleError(error);
      }
    },
    handleRest() {},
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
    handleSelectOrg() {
      uni.navigateTo({
        url: "/pages/org-selector/index?orgType=4",
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
