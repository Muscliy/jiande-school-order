<template>
  <tosb-layout footer>
    <van-cell title="学校">新安江中学</van-cell>
    <van-cell title="状态">处理中</van-cell>
    <van-cell title="承修单位">建的XXXX</van-cell>
    <view class="tosb-cell">
      <view style="padding-bottom: 10px"><text>报修原因</text> </view>
      <view class="van-cell__value value-class"
        ><text> 达萨罗看机会点开链接阿萨了啥事了倒计时啊乐凯大街拉数据d </text>
      </view>
    </view>
    <view class="tosb-cell">
      <view class="pb-16"><text class="text-muted">报修图片</text></view>
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
    <van-field
      label="报修原因"
      type="textarea"
      placeholder="请输入原因"
      :autosize="{ minHeight: 200 }"
      border
    />
    <view class="tosb-cell">
      <view class="pb-16"><text class="text-muted">上传维修图片</text> </view>
      <van-uploader :file-list="fileList" />
    </view>
    <view class="tosb-cell">
      <view class="pb-16"><text class="text-muted">上传物料清单</text> </view>
      <van-uploader :file-list="fileList" />
    </view>

    <view slot="footer" class="pb-32 bg-white">
      <view class="flex flex-row py-16">
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
  </tosb-layout>
</template>

<script>
import { commonMod } from "@/store";
export default {
  computed: {
    imageHeight() {
      const { systemInfo } = commonMod;
      return (systemInfo.windowWidth - 62) / 4;
    },
  },
  data() {
    return {
      title: "Hello",
      images: [
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
      ],
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
  methods: {
    handleConfirm() {},
  },
};
</script>

<style></style>
