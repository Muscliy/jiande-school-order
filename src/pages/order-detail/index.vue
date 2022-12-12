<template>
  <tosb-page footer>
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
    <view class="tosb-cell">
      <view class="pb-16"><text class="text-muted">维修记录</text> </view>
      <view
        ><text> 达萨罗看机会点开链接阿萨了啥事了倒计时啊乐凯大街拉数据d </text>
      </view>
    </view>
    <view class="tosb-cell">
      <view class="pb-16"><text class="text-muted">维修凭着</text></view>
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
    <view class="tosb-cell">
      <view class="pb-16"><text class="text-muted">物料清单</text></view>
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
    };
  },
  onLoad() {},
  methods: {
    handleConfirm() {},
    handleRest() {},
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
