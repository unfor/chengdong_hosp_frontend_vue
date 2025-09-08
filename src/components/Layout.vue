<template>
  <div class="header">
    <h1>医院排班管理系统</h1>
    <div class="header-right">
      <div class="time-info">
        <el-icon><Clock /></el-icon>
        <span class="time-string">{{
          new Date(currentTime).toLocaleString()
        }}</span>
      </div>
      <el-button
        type="primary"
        @click="handleLogout"
        class="logout-btn"
        v-show="isAdmin"
      >
        退出登录
      </el-button>
    </div>
  </div>
  <div class="layout">
    <el-tabs
      v-model="activeTab"
      @tab-change="handleTabChange"
      class="tab-container"
      type="border-card"
    >
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><HomeFilled /></el-icon>
            <span>医院概况</span>
          </span>
        </template>
        <HospitalIntro />
      </el-tab-pane>

      <el-tab-pane label="值班信息">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>值班信息</span>
          </span>
        </template>
        <ScheduleInfo />
      </el-tab-pane>

      <el-tab-pane v-if="!isAdmin" label="管理员登录">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Key /></el-icon>
            <span>管理员登录</span>
          </span>
        </template>
        <AdminLogin @login-success="handleLoginSuccess" />
      </el-tab-pane>

      <el-tab-pane v-if="isAdmin" label="管理员设置">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Tools /></el-icon>
            <span>管理员设置</span>
          </span>
        </template>
        <AdminPage />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HospitalIntro from "@pages/HospitalIntro.vue";
import ScheduleInfo from "@pages/ScheduleInfo.vue";
import AdminLogin from "../pages/AdminLogin.vue";
import AdminPage from "../pages/AdminPage.vue";

// 登录状态管理
const isAdmin = ref(false);
const activeTab = ref("0");

// 检查登录状态
const checkLoginStatus = () => {
  const isAdminLoggedIn = localStorage.getItem("isAdmin") === "true";
  isAdmin.value = isAdminLoggedIn;
};

// 处理登录成功
const handleLoginSuccess = () => {
  isAdmin.value = true;
  localStorage.setItem("isAdmin", "true");
};

// 退出登录
const handleLogout = () => {
  isAdmin.value = false;
  localStorage.removeItem("isAdmin");
  activeTab.value = "0";
};

// 处理标签页切换
const handleTabChange = (key) => {
  activeTab.value = key;
};

const currentTime = ref(Date.now());

const startTimeCount = () => {
  const countFunc = () => {
    let lastTime = currentTime.value,
      nowTime = Date.now();
    if (nowTime - lastTime >= 1000) {
      currentTime.value = nowTime;
    }
    window.requestAnimationFrame(countFunc);
  };
  window.requestAnimationFrame(countFunc);
};

// 组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus();
  startTimeCount();
});
</script>

<style scoped>
@import "../styles/Layout.less";
</style>
