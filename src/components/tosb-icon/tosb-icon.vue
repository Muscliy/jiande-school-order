<template>
  <view class="flex justify-center items-center">
    <text>dsl</text>
  </view>
</template>

<script>
export default {
  name: "TosbIcon",
  props: {
    name: String,
    size: [String, Number],
    width: [String, Number],
    height: [String, Number],
  },
  data() {
    return {};
  },
  computed: {
    iconStyle() {
      if (this.size) {
        return `width: ${this.size}rpx;height: ${this.size}rpx`;
      }
      return `width: ${this.width}rpx;height: ${this.height}rpx`;
    },
    isLocalIcon() {
      return this.name.startsWith("icon-");
    },
    imageSrc() {
      return (
        "https://wlhyos-resource.oss-cn-hangzhou.aliyuncs.com/wlhyos/public/media/siji_xiaochegnxu/" +
        this.name +
        ".png"
      );
    },
  },
};
</script>

<style>
.bg-no-repeat {
  background-repeat: no-repeat;
}
</style>
