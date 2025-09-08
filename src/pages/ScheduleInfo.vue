<template>
  <div class="schedule-info-container">
    <h2 class="schedule-title">今日排班信息 ({{ currentDate }})</h2>

    <div v-if="scheduleData.length > 0">
      <div v-for="dept in departments" :key="dept">
        <el-card :title="dept" class="schedule-card">
          <el-row :gutter="[16, 16]">
            <el-col
              v-for="item in scheduleData.filter(
                (item) => item.department === dept
              )"
              :key="item.id"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
            >
              <div class="doctor-card">
                <div class="doctor-info">
                  <el-avatar :size="64" :src="item.avatar" :alt="item.name" />
                  <div class="doctor-details">
                    <el-text strong class="doctor-name">{{
                      item.name
                    }}</el-text>
                    <el-text class="doctor-position">{{
                      item.position
                    }}</el-text>
                    <el-text class="doctor-duty-time">{{
                      item.dutyTime
                    }}</el-text>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
    <el-card v-else class="no-schedule-card">
      <p type="secondary" align="center">暂无排班信息</p>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, defineOptions } from "vue";
// 已通过自动导入插件注册Element Plus组件

defineOptions({
  name: "ScheduleInfo",
});

const scheduleData = ref([]);
const currentDate = ref("");
const departments = ref([]);

onMounted(() => {
  // 设置当前日期
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  currentDate.value = now.toLocaleDateString("zh-CN", options);

  // 从localStorage加载排班数据
  const savedSchedule = localStorage.getItem("scheduleData");
  if (savedSchedule) {
    try {
      const data = JSON.parse(savedSchedule);
      scheduleData.value = data;

      // 提取所有科室
      const deptSet = new Set();
      data.forEach((item) => deptSet.add(item.department));
      departments.value = Array.from(deptSet);
    } catch (e) {
      console.error("Failed to parse schedule data:", e);
    }
  } else {
    // 使用模拟数据
    const mockData = [
      {
        id: 1,
        name: "张三",
        department: "内科",
        position: "主任医师",
        dutyTime: "上午 8:00-12:00",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=张三",
      },
      {
        id: 2,
        name: "李四",
        department: "内科",
        position: "副主任医师",
        dutyTime: "下午 14:00-18:00",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=李四",
      },
      {
        id: 3,
        name: "王五",
        department: "外科",
        position: "主任医师",
        dutyTime: "全天 8:00-18:00",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=王五",
      },
      {
        id: 4,
        name: "赵六",
        department: "妇产科",
        position: "主治医师",
        dutyTime: "上午 8:00-12:00",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=赵六",
      },
    ];
    scheduleData.value = mockData;
    departments.value = ["内科", "外科", "妇产科"];
  }
});
</script>

<style lang="less" scoped>
@import "../styles/ScheduleInfo.less";
</style>
