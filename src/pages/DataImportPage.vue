<template>
  <div class="data-import-container">
    <el-card class="import-card">
      <h2 class="page-title">数据导入</h2>
      <el-upload
        ref="upload"
        :before-upload="handleUpload"
        :show-file-list="false"
        action=""
      >
        <el-button :icon="Upload" class="upload-button">
          点击上传文件
        </el-button>
      </el-upload>
      <div class="upload-hint">支持格式: CSV, Excel | 最大文件大小: 10MB</div>
    </el-card>

    <el-card class="import-history-card">
      <h3 class="section-title">导入历史</h3>
      <div class="history-list">
        <!-- 这里将通过API动态加载历史记录 -->
        <div class="history-item empty-state">暂无导入记录</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, defineOptions } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "DataImportPage",
});

const upload = ref(null);

const handleUpload = (file) => {
  // 模拟文件上传处理
  return new Promise((resolve) => {
    setTimeout(() => {
      ElMessage.success(`${file.name} 上传成功`);
      resolve(true);
    }, 1000);
  });
};
</script>

<style lang="less" scoped>
@import "../styles/DataImportPage.less";
</style>
