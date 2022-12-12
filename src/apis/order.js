import axios from "@/endpoints/axios";

export const addOrderApi = (params) => axios.post(`ma/woorgRest/add`, params);

export const editOrderApi = (params) => axios.post(`ma/woorgRest/edit`, params);

export const queryOrderApi = (params) =>
  axios.get(`ma/woorgRest/edit/${params.orderId}`);

export const getCodeApi = (params) => axios.get(`ma/woorgRest/getCode`, params);

export const queryOrderListApi = (params) =>
  axios.get(`ma/woorgRest/list`, params);

export const removeOrderApi = (params) =>
  axios.get(`ma/woorgRest/remove`, params);

export const queryDispatchOrderListApi = (params) =>
  axios.get(`ma/wodispatchRest/list`, params);
