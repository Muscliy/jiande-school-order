<template>
  <tosb-page>
    <van-cell
      v-for="(org, index) in orgs"
      :key="index"
      :title="org.orgName"
      is-link
      @click="handleOrgSelect(org)"
    >
    </van-cell>
  </tosb-page>
</template>

<script>
import { queryOrgList } from "@/apis/org";

export default {
  data() {
    return {
      orgs: [],
    };
  },
  async onLoad(option) {
    const { orgType } = option;
    const res = await queryOrgList({ orgType: orgType });
    this.orgs = res.rows;
  },
  methods: {
    handleOrgSelect(org) {
      uni.$emit("orgSelect", org);
      uni.navigateBack();
    },
  },
};
</script>
