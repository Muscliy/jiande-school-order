<template>
  <view class="box-border relative h-full overflow-hidden">
    <scroll-view
      class="box-border relative flex-col h-full overflow-hidden d-flex h100"
      scroll-y
      :lower-threshold="150"
      :refresher-enabled="isPullRefresh"
      :refresher-triggered="isPullDown"
      :scroll-top="scrollTop"
      @refresherrefresh="onRefresh"
      @scrolltolower="onscrolltolower"
    >
      <slot />

      <tempalte v-if="isEmpty">
        <view class="flex items-center justify-center h-full tosb-empty">
          <text class="text-main text-28">暂无订单</text>
        </view>
      </tempalte>

      <uni-load-more
        v-if="showLoadMore && !isEmpty"
        :status="loadMoreState"
      ></uni-load-more>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "TosbListScroll",
  props: {
    // 有可能不需要加载更多
    showLoadMore: {
      type: Boolean,
      default: true,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    // loadmore状态
    isLoading: {
      type: Boolean,
      default: true,
    },
    // 是否下拉动画
    isPullDown: {
      type: Boolean,
      default: false,
    },
    // 是否为空
    isEmpty: {
      type: Boolean,
      default: false,
    },
    scrollTop: {
      type: Number,
    },
    isPullRefresh: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.onLoadmore();
  },
  methods: {
    onRefresh() {
      this.$emit("refresh");
    },
    onLoadmore() {
      this.$emit("loadmore");
    },
    onscrolltolower() {
      if (this.hasMore) {
        this.$emit("loadmore");
      }
    },
  },
  computed: {
    loadMoreState() {
      if (this.isLoading) {
        return "loading";
      }
      if (!this.hasMore) {
        return "noMore";
      }
      return "noMore";
    },
  },
};
</script>

<style lang="scss"></style>
