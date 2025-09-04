<template>
  <div class="layout">
    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="医院简介">
        <HospitalIntro />
      </el-tab-pane>
      <el-tab-pane label="排班信息">
        <ScheduleInfo />
      </el-tab-pane>
      <el-tab-pane v-if="!isAdmin" label="管理员登录">
        <AdminLogin @login-success="handleLoginSuccess" />
      </el-tab-pane>
      <el-tab-pane v-if="isAdmin" label="管理员设置">
        <AdminPage />
      </el-tab-pane>
      <el-button v-if="isAdmin" type="text" @click="handleLogout" class="logout-btn">
        退出登录
      </el-button>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HospitalIntro from '@pages/HospitalIntro.vue'
import ScheduleInfo from '@pages/ScheduleInfo.vue'
import AdminLogin from '../pages/AdminLogin.vue'
import AdminPage from '../pages/AdminPage.vue'

// 登录状态管理
const isAdmin = ref(false)
const activeTab = ref('0')

// 检查登录状态
const checkLoginStatus = () => {
  const isAdminLoggedIn = localStorage.getItem('isAdmin') === 'true'
  isAdmin.value = isAdminLoggedIn
}

// 处理登录成功
const handleLoginSuccess = () => {
  isAdmin.value = true
  localStorage.setItem('isAdmin', 'true')
}

// 退出登录
const handleLogout = () => {
  isAdmin.value = false
  localStorage.removeItem('isAdmin')
  activeTab.value = '0'
}

// 处理标签页切换
const handleTabChange = (key) => {
  activeTab.value = key
}

// 组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus()
})
</script>

<style scoped>
.layout {
  padding: 20px;
}
.logout-btn {
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>