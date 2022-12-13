<template>
  <tosb-page footer>
    <van-cell title="学校">{{ order.schoolName }}</van-cell>
    <van-cell title="状态">{{ orderStatus[order.orderStatus] }}</van-cell>
    <van-cell title="承修单位" v-if="order.orderStatus > 1">建的XXXX</van-cell>
    <view class="tosb-cell">
      <view style="padding-bottom: 10px"><text>报修原因</text> </view>
      <view class="van-cell__value value-class"
        ><text> {{ order.orderContent }} </text>
      </view>
    </view>
    <view class="tosb-cell">
      <view class="pb-16"><text class="text-muted">报修图片</text></view>
      <van-image
        v-for="(img, index) in order.woOrderImgGd"
        :key="index"
        :width="imageHeight"
        :height="imageHeight"
        lazy-load
        :src="`https://hswo.yglyz.com${img.imgUrl}`"
        :style="{ marginRight: (index + 1) % 4 === 0 ? '0px' : '10px' }"
        @click="handleImagePreview(order.woOrderImgGd, index)"
      />
    </view>
    <view class="tosb-cell" v-if="order.orderStatus > 1">
      <view class="pb-16"><text class="text-muted">维修人员</text> </view>
      <view
        ><text> {{ order.repairName }} </text>
      </view>
    </view>
    <view class="tosb-cell" v-if="order.orderStatus > 1">
      <view class="pb-16"><text class="text-muted">维修电话</text> </view>
      <view
        ><text> {{ order.repairUserPhone }} </text>
      </view>
    </view>

    <view class="tosb-cell" v-if="order.orderStatus > 2">
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
    </view>
    <view slot="footer">
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
import { queryOrderApi } from "../../apis/order";
import { OrderStatus } from "../../helpers/constants";
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
      orderStatus: OrderStatus,
    };
  },
  async onLoad(option) {
    const { orderId } = option;
    const res = await queryOrderApi({ orderId });
    this.order = res.data.woOrder;
  },
  methods: {
    handleConfirm() {},
    handleRest() {},
    handleImagePreview(images, index) {
      const imgs = [];
      images.forEach((element) => {
        imgs.push(`https://hswo.yglyz.com${element.imgUrl}`);
      });
      uni.previewImage({
        urls: imgs,
        current: imgs[index],
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
