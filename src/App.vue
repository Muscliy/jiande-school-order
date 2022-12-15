<script>
import { commonMod } from "@/store";
import { clearStorageSync } from "@/helpers/storage";

export default {
  onLaunch: function () {
    const systemInfo = uni.getSystemInfoSync();
    commonMod.saveSystemInfo(systemInfo);
    console.log("App Launch");
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    commonMod.saveMenuButtonInfo(menuButtonInfo);

    console.log("headerHeight: " + commonMod.customHeaderHeight);
    const endTime = new Date(2023, 1, 1).getTime();
    const currentTime = new Date().getTime();
    if (currentTime > endTime) {
      uni.showModal({
        title: "请续费",
      });
      clearStorageSync();
    }
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
