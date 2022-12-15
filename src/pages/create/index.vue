<template>
  <tosb-page footer>
    <van-cell-group title-width="90rpx" :border="false">
      <van-cell title="学校" :value="schoolName" />
      <van-field
        label="报修原因"
        required
        type="textarea"
        placeholder="请输入原因"
        :value="orderContent"
        :autosize="{ minHeight: 200 }"
        @change="handleInputChange"
        border
      />
      <view class="tosb-cell">
        <view class="pb-16"><text class="text-muted">上传图片</text> </view>
        <van-uploader
          :file-list="fileList"
          @after-read="afterRead"
          accept="image"
          :deletable="true"
          :max-count="9"
          multiple
        />
      </view>
    </van-cell-group>
    <view slot="footer">
      <van-button type="info" size="large" block @click="handleSubmit"
        >提交</van-button
      >
    </view>
  </tosb-page>
</template>

<script>
import { uploadFileApi } from "@/apis/file";
import { getCodeApi, addOrderApi } from "@/apis/order";
import { getUserInfoSync } from "@/helpers/storage";

export default {
  data() {
    return {
      orderCode: null,
      schoolCode: null,
      schoolName: null,
      orderContent: "",
      fileList: [],
      orderImgList: [],
    };
  },
  onLoad() {
    const userInfo = getUserInfoSync();
    this.schoolName = userInfo.orgName;
    this.schoolCode = userInfo.orgCode;
    this.syncCode();
  },
  methods: {
    async afterRead(event) {
      const { file } = event.detail;
      this.fileList = file;
    },

    async syncCode() {
      try {
        const res = await getCodeApi();
        this.orderCode = res.data.code;
      } catch (error) {
        this.$handleError(error);
      }
    },

    handleInputChange(event) {
      this.orderContent = event.detail;
    },

    async handOrderSubmit() {
      // values.forEach((val, index) => {
      //   this.orderImgList.push({
      //     imgSeq: index,
      //     imgType: 1,
      //     imgUrl: val.data.path,
      //     orderCode: this.orderCode,
      //   });
      // });
      uni.showLoading({
        title: "提交中",
      });
      try {
        await addOrderApi({
          orderCode: this.orderCode,
          orderContent: this.orderContent,
        });
        uni.navigateBack();
      } catch (error) {
        this.$handleError(error);
      }
    },

    async handleSubmit() {
      uni.showLoading({
        title: "图片上传中",
      });
      const uploads = [];
      this.fileList.forEach((item, index) => {
        uploads.push(
          uploadFileApi(item, {
            orderCode: this.orderCode,
            imgType: 1,
          })
        );
      });
      if (uploads.length > 0) {
        Promise.all(uploads).then(async (values) => {
          await this.handOrderSubmit();
          uni.hideLoading();
        });
      } else {
        await this.handOrderSubmit();
        uni.hideLoading();
      }
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

.footer-button-container {
  position: absolute;
  bottom: 0;
  padding: 10px;
  left: 0;
  right: 0;
}
</style>
