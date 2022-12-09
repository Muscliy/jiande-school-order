<template>
  <view
    class="tosb-layout h-full flex flex-col box-border"
    :style="layoutStyle"
  >
    <template v-if="nav">
      <view class="flex-none">
        <slot name="nav" />
      </view>
    </template>

    <slot />

    <template v-if="footer">
      <view class="flex-none">
        <slot name="footer" />
      </view>
    </template>
  </view>
</template>

<script>
/**
 * fk 微信不能识别自定义的tabbar高度
 */
export default {
  name: "TosbLayout",
  props: {
    nav: {
      type: Boolean,
      default: false, // 是否自定义nav
    },
    footer: {
      type: Boolean,
      default: false, // 是否有footer
    },
    tabbar: {
      type: Boolean,
      default: false, // 是否有tabbar
    },
    bgColor: {
      type: String,
      default: "", // 背景颜色
    },
  },
  computed: {
    layoutStyle() {
      let style = "";
      if (this.tabbar) {
        style += "padding-bottom: 113rpx;";
        // style += `padding-bottom: calc(138rpx + constant(safe-area-inset-bottom));padding-bottom: calc(138rpx + env(safe-area-inset-bottom));`
      }
      if (this.bgColor) {
        style += `background-color: ${this.bgColor}; `;
      }
      return style;
    },
  },
};
</script>

<style></style>
