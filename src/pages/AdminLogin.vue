<template>
  <div class="admin-login-container">
    <el-card class="login-card" :title="'管理员登录'">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            class="login-button"
            :loading="loading"
            size="large"
          >
            登录
          </el-button>
        </el-form-item>

        <div class="login-tips">
          <p>* 默认账户：admin</p>
          <p>* 默认密码：admin123</p>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, defineOptions } from "vue";
import { ElMessage } from "element-plus";
import CryptoJS from "crypto-js";

defineOptions({
  name: "AdminLogin",
});

const props = defineProps({
  onLoginSuccess: {
    type: Function,
    required: true,
  },
});

const formRef = ref(null);
const loading = ref(false);
const form = ref({
  username: "",
  password: "",
});

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

// 处理登录提交
const handleLogin = async () => {
  try {
    await formRef.value.validate();
    loading.value = true;

    // 在实际应用中，这里应该发送请求到后端进行验证
    // 这里使用模拟数据进行验证
    const { username, password } = form.value;
    const hashedPassword = CryptoJS.MD5(password).toString();

    // 检查是否存在管理员账户信息
    const adminInfo = localStorage.getItem("adminInfo");
    let isValid = false;

    if (adminInfo) {
      try {
        const { savedUsername, savedPassword } = JSON.parse(adminInfo);
        isValid =
          savedUsername === username && savedPassword === hashedPassword;
      } catch (e) {
        console.error("Failed to parse admin info:", e);
      }
    } else {
      // 如果没有保存的管理员信息，使用默认账户
      // 默认账户：admin，密码：admin123
      isValid =
        username === "admin" &&
        hashedPassword === "21232f297a57a5a743894a0e4a801fc3";
    }

    if (isValid) {
      // 登录成功，保存token到localStorage
      localStorage.setItem("adminToken", "admin-token-" + Date.now());
      ElMessage.success("登录成功！");
      props.onLoginSuccess();
    } else {
      ElMessage.error("用户名或密码错误");
    }
  } catch (error) {
    // 表单验证失败，不需要额外处理
    console.error("Form validation error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
@import "../styles/AdminLogin.less";
</style>
