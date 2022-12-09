import Vue from "vue";
import * as time from "@/utils/time";

function defaultValue(val, placeholder = "--") {
  if (val === "" || val === undefined || val === null) {
    return placeholder;
  }
  return val;
}

const filters = {
  ...time,
  defaultValue,
};

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
