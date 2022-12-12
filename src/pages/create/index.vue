<template>
  <tosb-page footer>
    <van-cell title="学校" value="新安江中学" />
    <van-field
      label="报修原因"
      type="textarea"
      placeholder="请输入原因"
      :autosize="{ minHeight: 200 }"
      border
    />
    <view class="tosb-cell">
      <view class="pb-16"><text class="text-muted">上传图片</text> </view>
      <van-uploader :file-list="fileList" />
    </view>
    <view slot="footer">
      <van-button type="info" size="large" block>提交</van-button>
    </view>
  </tosb-page>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      fileList: [
        {
          url: "https://img.yzcdn.cn/vant/leaf.jpg",
          name: "图片1",
        },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        {
          url: "http://iph.href.lu/60x60?text=default",
          name: "图片2",
          isImage: true,
          deletable: true,
        },
      ],
    };
  },
  onLoad() {},
  methods: {},
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
