<template>
  <tosb-page footer>
    <van-cell title="学校" :value="schoolName" />
    <van-field
      label="报修原因"
      type="textarea"
      placeholder="请输入原因"
      :value="orderContent"
      :autosize="{ minHeight: 200 }"
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
    <view slot="footer">
      <van-button type="info" size="large" block>提交</van-button>
    </view>
  </tosb-page>
</template>

<script>
import { uploadFileApi } from "../../apis/file";
import { getCodeApi } from "../../apis/order";
import { getUserInfoSync } from "../../helpers/storage";

export default {
  data() {
    return {
      orderCode: null,
      schoolCode: null,
      schoolName: null,
      orderContent: null,
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
      const res = await getCodeApi();
      console.log(res);
    },

    handleAdd(values) {},

    handleSubmit() {
      uni.showLoading({
        title: "图片上传中",
      });
      const uploads = [];
      this.fileList.forEach((item, index) => {
        uploads(uploadFileApi(item));
      });
      Promise.all(uploads).then((values) => {});
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
