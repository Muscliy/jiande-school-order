<script>
import { commonMod } from "@/store";

export default {
  onLaunch: function () {
    const systemInfo = uni.getSystemInfoSync();
    commonMod.saveSystemInfo(systemInfo);
    console.log("App Launch");
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    commonMod.saveMenuButtonInfo(menuButtonInfo);

    console.log("headerHeight: " + commonMod.customHeaderHeight);
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  onError(error) {
    const errorStr = JSON.stringify(error);
    const errorResutl = errorStr.split("\\n");
    this.$handleError({
      message: errorResutl[1],
      stack: error,
    });
  },
};
</script>

<style>
/*每个页面公共css */
@import url("tailwindcss/tailwind.css");
@import "~@/styles/index.scss";
</style>
