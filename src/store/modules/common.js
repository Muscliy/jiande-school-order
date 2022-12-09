const state = () => ({
  systemInfo: {}, // 全局系统信息
  menuButtonInfo: {}, // 胶囊信息
  userLocation: {}, // 用户定位信息
});

const mutations = {
  saveSystemInfo(state, systemInfo) {
    state.systemInfo = systemInfo;
  },
  saveMenuButtonInfo(state, menuButtonInfo) {
    state.menuButtonInfo = menuButtonInfo;
  },
  saveUserLocation(state, userLocation) {
    state.userLocation = userLocation;
  },
};

const getters = {
  navBarHeight(state) {
    const { systemInfo, menuButtonInfo } = state;
    const { statusBarHeight } = systemInfo;
    const { height, top } = menuButtonInfo;
    return height + (top - statusBarHeight) * 2;
  },
  navBarWidth(state) {
    const { systemInfo, menuButtonInfo } = state;
    const { windowWidth } = systemInfo;
    const { right, width } = menuButtonInfo;
    return windowWidth - (windowWidth - right) * 2 - width;
  },
  customHeaderHeight(state, getters) {
    return getters.navBarHeight + state.systemInfo.statusBarHeight;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
