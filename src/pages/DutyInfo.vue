<template>
  <div class="duty-info-container">
    <h2 class="page-title">值班详情信息</h2>
    
    <el-card class="filter-card">
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="日期">
          <el-date-picker
            v-model="filterForm.date"
            type="date"
            placeholder="选择日期"
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="科室">
          <el-select
            v-model="filterForm.department"
            placeholder="选择科室"
            style="width: 180px"
          >
            <el-option
              v-for="dept in departments"
              :key="dept"
              :label="dept"
              :value="dept"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="duty-card">
      <el-table :data="dutyList" border style="width: 100%">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="department" label="科室" />
        <el-table-column prop="name" label="值班人员" />
        <el-table-column prop="position" label="职称" />
        <el-table-column prop="dutyTime" label="值班时间" />
        <el-table-column prop="contact" label="联系方式" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, defineOptions } from "vue";
import { dutyService } from "../services/duty";

defineOptions({
  name: "DutyInfo",
});

// 筛选表单（如果后端不支持科室筛选，可暂时移除department字段）
const filterForm = ref({
  date: "",
  department: "", // 若后端支持科室筛选则保留，否则删除
});

// 科室列表（如果后端不支持科室筛选，可暂时注释）
const departments = ref(["内科", "外科", "妇产科", "儿科", "急诊科"]);

// 值班信息列表
const dutyList = ref([]);


// 页面加载时获取数据（可默认加载当天数据）
onMounted(() => {
  // 默认查询今天的值班信息
  filterForm.value.date = new Date();
  fetchDutyInfo();
});

// 处理日期格式，避免UTC转换问题
const formatDate = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 查询值班信息
const fetchDutyInfo = async () => {
  try {
    
    // 转换日期格式为YYYY-MM-DD
    // const date = filterForm.value.date 
    //   ? filterForm.value.date.toISOString().split('T')[0] 
    //   : '';
    const date = filterForm.value.date ? formatDate(filterForm.value.date) : '';

    if (!date) {
      // 提示用户选择日期
      ElMessage.warning("请选择查询日期");
      return;
    }
    
    
    // 调用值班信息查询接口
    const res = await dutyService.queryDutyByDate(date);
    
    // 根据后端返回结构调整（如果后端直接返回数组，则无需 .data）
    dutyList.value = res || [];

   if (filterForm.value.department) {
      dutyList.value = dutyList.value.filter(
        item => item.department === filterForm.value.department
      );
    }

    // 无查询结果提示
    if (dutyList.value.length === 0) {
      ElNotification.info({
        title: '提示',
        message: '未找到相关值班信息',
        position: 'bottom-right'
      });
    }
  } catch (error) {
    console.error("获取值班信息失败:", error);
    ElMessage.error("获取值班信息失败，请稍后重试");
  }
};

// 处理筛选
const handleFilter = () => {
  fetchDutyInfo();
};
</script>

<style lang="less" scoped>
.duty-info-container {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  color: #333;
}

.filter-card {
  margin-bottom: 20px;
}

.filter-form {
  display: flex;
  gap: 10px;
}

.duty-card {
  margin-top: 20px;
}
</style>