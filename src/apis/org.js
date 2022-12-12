import axios from "@/endpoints/axios";

export const queryOrgList = (params) => axios.post(`ma/woorgRest/list`, params);
