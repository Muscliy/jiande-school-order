import Vue from "vue";
import App from "./App";
import "@/styles/tailwind.css";
import "@/helpers/handleError";
import "@/filters";

Vue.config.productionTip = false;

Vue.config.errorHandler = function errorHandler(error) {
  uni.showToast({
    title: error.message,
    duration: 2000,
    mask: true,
  });
};

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
