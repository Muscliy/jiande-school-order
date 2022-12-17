<template>
  <view class="box-border relative flex flex-col h-full">
    <template v-if="header">
      <view class="flex-none">
        <slot name="nav" />
      </view>
    </template>

    <view :style="contentStyle" class="flex-1 overflow-scroll">
      <slot />
    </view>

    <template v-if="footer">
      <view class="flex-none p-16">
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
  name: "TosbPage",
  props: {
    header: {
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
    contentStyle() {
      let style = "";
      if (this.$slots.footer) {
        style += "height: calc(100% - 64px)";
      }
      return style;
    },
  },
};
</script>

<style></style>
