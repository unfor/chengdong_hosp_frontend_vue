<template>
  <div class="hospital-intro-container">
    <div class="intro-header">
      <h2 class="hospital-title">{{ hospitalInfo.name }}</h2>
    </div>

    <div class="intro-content-container">
      <el-card class="intro-card" :title="'医院简介'" header="医院简介">
        <div class="intro-card-content">
          <p>{{ hospitalInfo.introduction }}</p>
        </div>
      </el-card>
    </div>

    <div class="contact-card-container" header-class="contact-card-header">
      <el-card class="intro-card" :title="'联系方式'" header="联系方式">
        <div class="intro-card-content">
          <!-- <p>{{ hospitalInfo.introduction }}</p> -->
          <div class="intro">
            <div class="intro-item">
              <el-icon><LocationFilled /></el-icon>
              <span>医院地址</span>
            </div>
            <div class="intro-content">{{ hospitalInfo.address }}</div>
          </div>
          <div class="intro intro-phone">
            <div class="intro-item">
              <el-icon><PhoneFilled /></el-icon>
              <span>联系电话</span>
            </div>
            <div class="intro-content">
              <span>总机：{{ hospitalInfo.phone }}</span>
              <span>急诊：{{ hospitalInfo.emergencyPhone }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineOptions, watch, onUpdated } from "vue";
import { queryHospitalInfo } from "../services/hospital";
import { ElMessage } from "element-plus";

defineOptions({
  name: "HospitalIntro",
});

const props = defineProps({
  isActiveTab: Boolean,
});

const hospitalInfo = ref({});
const isAdmin = ref(false);

watch(
  () => props.isActiveTab,
  (newVal, oldVal) => {
    if (!oldVal && newVal) {
      // 组件从非激活状态切换到激活状态
      const hospitalInfoString = localStorage.getItem("hospitalInfo");
      if (hospitalInfoString) {
        hospitalInfo.value = JSON.parse(hospitalInfoString);
      } else {
        loadHospitalInfo();
      }
    }
  },
  { immediate: true }
);

// 加载医院信息
const loadHospitalInfo = () => {
  // 从后端查询医院信息
  queryHospitalInfo()
    .then((res) => {
      if (res) {
        hospitalInfo.value = res;
        localStorage.setItem("hospitalInfo", JSON.stringify(res));
      } else {
        ElMessage.error("查询医院信息失败");
      }
    })
    .catch((e) => {
      console.error("Failed to query hospital info:", e);
      ElMessage.error("查询医院信息失败");
    });
};

onMounted(() => {
  // 检查是否是管理员
  const adminToken = localStorage.getItem("adminToken");
  isAdmin.value = !!adminToken;

  loadHospitalInfo();
});
</script>

<style lang="less" scoped>
@import "../styles/HospitalIntro.less";
</style>
