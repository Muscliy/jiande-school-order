import axios from "@/endpoints/axios";
import queryString from "query-string";

export const wxLoginApi = (params) =>
  axios.get(
    `ma/wxuser/wx67ffcd11e4cd6e78/getOpenId?${queryString.stringify(params)}`
  );
