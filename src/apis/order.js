import axios from "@/endpoints/axios";

export const addOrderApi = (params) => axios.post(`ma/woorderRest/add`, params);

export const editOrderApi = (params) =>
  axios.post(`ma/woorderRest/edit`, params);

export const queryOrderApi = (params) =>
  axios.get(`ma/woorderRest/edit/${params.orderId}`);

export const getCodeApi = (params) =>
  axios.post(`ma/woorderRest/getCode`, params);

export const queryOrderListApi = (params) =>
  axios.post(`ma/woorderRest/list`, params);

export const removeOrderApi = (params) =>
  axios.post(`ma/woorderRest/remove`, params);

export const queryDispatchOrderListApi = (params) =>
  axios.post(`ma/wodispatchRest/list`, params);
