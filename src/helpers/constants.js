export const OrderStatusStrMap = {
  1: "待派单",
  2: "处理中",
  3: "退单",
  4: "维修完成",
  6: "维修结束",
};

export const OrderStatus = {
  WaitingDispatch: "1",
  Working: "2",
  ChargeBack: "3",
  Finish: "4",
};

export const GlobalEventName = {
  DispatchSuccess: "DispatchSuccess",
};

// @Excel(name = "机构类型：1:学校，2:教育局，3:数字公司，4:维修公司")
export const OrgType = {
  School: "1",
  EducationBureau: "2",
  DataCompany: "3",
  MaintenanceCompany: "4",
};

export const HostUrl = "https://hswo.yglyz.com";
