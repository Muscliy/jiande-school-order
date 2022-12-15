<template>
  <tosb-page footer>
    <van-cell-group title-width="90rpx" :border="false">
      <van-cell title="学校">{{ order.schoolName }}</van-cell>
      <van-cell title="状态">{{ orderStatus[order.orderStatus] }}</van-cell>
      <van-cell title="承修单位">{{ order.repairName }}</van-cell>
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
      <van-field
        label="维修内容"
        required
        type="textarea"
        placeholder="请输入内容"
        :autosize="{ minHeight: 50 }"
        :value="repairContent"
        border
        @change="handleInputChange"
      />
      <view class="tosb-cell">
        <view class="pb-16"><text class="text-muted">上传维修图片</text> </view>
        <van-uploader
          :file-list="repairFileList"
          @after-read="afterReadRepair"
          accept="image"
          :deletable="true"
          :max-count="9"
          multiple
        />
      </view>
      <view class="tosb-cell">
        <view class="pb-16"><text class="text-muted">上传物料清单</text> </view>
        <van-uploader
          :file-list="materielFileList"
          @after-read="afterReadMateriel"
          accept="image"
          :deletable="true"
          :max-count="9"
          multiple
        />
      </view>
    </van-cell-group>

    <view
      slot="footer"
      v-if="order.orderStatus === '2' && repairContent.length > 1"
    >
      <view class="flex flex-row">
        <view class="flex items-center justify-center flex-1 px-16">
          <van-button
            class="w-full"
            block
            type="primary"
            @click="handleConfirm"
          >
            维修完成
          </van-button></view
        >
      </view>
    </view>
  </tosb-page>
</template>

<script>
import { commonMod } from "@/store";
import { editOrderApi, queryOrderApi } from "@/apis/order";
import { OrderStatusStrMap } from "@/helpers/constants";
import { uploadFileApi } from "@/apis/file";
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
      orderStatusStrMap: OrderStatusStrMap,
      repairContent: "",
      repairFileList: [],
      materielFileList: [],
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
    async afterReadRepair(event) {
      const { file } = event.detail;
      this.repairFileList = file;
    },
    async afterReadMateriel(event) {
      const { file } = event.detail;
      this.materielFileList = file;
    },

    async handleSubmitRepairFiles() {
      const uploads = [];
      this.repairFileList.forEach((item, index) => {
        uploads.push(
          uploadFileApi(item, {
            orderCode: this.order.orderCode,
            imgType: 2,
          })
        );
      });

      if (uploads.length > 0) {
        Promise.all(uploads).then(async (values) => {
          await this.handleSubmitMaterielFiles();
        });
      } else {
        await this.handleSubmitMaterielFiles();
      }
    },

    async handleSubmitMaterielFiles() {
      const uploads = [];
      this.materielFileList.forEach((item, index) => {
        uploads.push(
          uploadFileApi(item, {
            orderCode: this.order.orderCode,
            imgType: 3,
          })
        );
      });

      if (uploads.length > 0) {
        Promise.all(uploads).then(async (values) => {
          await this.handOrderSubmit();
        });
      } else {
        await this.handOrderSubmit();
      }
    },

    async handOrderSubmit() {
      try {
        await editOrderApi({
          orderId: this.order.orderId,
          orderCode: this.order.orderCode,
          repairContent: this.repairContent,
          orderStatus: 4,
          schoolUser: this.order.schoolUser,
          schoolName: this.order.schoolName,
          schoolUserPhone: this.order.schoolUserPhone,
        });
        uni.reLaunch({
          url: "/pages/worker/index",
        });
        uni.hideLoading();
      } catch (error) {
        this.$handleError(error);
        uni.hideLoading();
      }
    },

    async handleConfirm() {
      uni.showLoading({
        title: "图片上传中",
      });
      await this.handleSubmitRepairFiles();
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
    handleInputChange(event) {
      this.repairContent = event.detail;
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
