import Vue from "vue";
import Vuex from "vuex";
import { moduleWrapper } from "@/helpers/storeWrapper";

import common from "./modules/common";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    commonMod: common,
  },
});

export const commonMod = moduleWrapper("commonMod", common, store);

export default store;
