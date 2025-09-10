<template>
  <div class="admin-page-container">
    <el-tabs
      v-model="activeTab"
      type="card"
      size="large"
      class="inner-tab-container"
    >
      <!-- 导入人员信息 -->
      <el-tab-pane name="import">
        <template #label>
          <span>导入人员信息</span>
        </template>
        <el-card class="import-card">
          <el-upload
            drag
            :before-upload="handleImport"
            :show-file-list="false"
            action=""
            class="upload-dragger"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">点击或拖拽文件到此区域上传</div>
            <div class="el-upload__tip">
              支持Excel文件导入，文件需包含：姓名、科室、职位等列
            </div>
          </el-upload>
        </el-card>
      </el-tab-pane>

      <!-- 人员信息管理 -->
      <el-tab-pane name="staff">
        <template #label>
          <span>人员信息管理</span>
        </template>
        <el-card class="staff-card">
          <div class="staff-header">
            <el-button type="primary" :icon="ElPlus" @click="handleAddStaff">
              添加人员
            </el-button>
          </div>
          <div ref="staffTableContainer" class="table-container">
            <el-table
              :data="staffData"
              row-key="id"
              :height="500"
              style="width: 100%"
            >
              <el-table-column prop="name" label="姓名" />
              <el-table-column prop="department" label="科室" />
              <el-table-column prop="position" label="职位" />
              <el-table-column label="操作" width="180">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    :icon="Edit"
                    @click="handleEditStaff(scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    danger
                    size="small"
                    :icon="Delete"
                    @click="handleStaffDelete(scope.row.id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-tab-pane>

      <!-- 排班管理 -->
      <el-tab-pane name="schedule">
        <template #label>
          <span>排班管理</span>
        </template>
        <el-card class="schedule-card">
          <el-form @submit.prevent="handleScheduleSave" class="schedule-form">
            <div class="schedule-form-content">
              <div
                v-for="(staff, index) in staffData"
                :key="staff.id"
                class="schedule-item"
              >
                <el-input v-model="scheduleForm[index].staff" type="hidden" />
                <el-input
                  v-model="scheduleForm[index].department"
                  type="hidden"
                />
                <el-input
                  v-model="scheduleForm[index].position"
                  type="hidden"
                />
                <el-input v-model="scheduleForm[index].avatar" type="hidden" />
                <div class="schedule-item-content">
                  <el-text strong
                    >{{ staff.name }} - {{ staff.department }} -
                    {{ staff.position }}</el-text
                  >
                  <el-form-item
                    label="值班时间"
                    :prop="`scheduleForm.${index}.dutyTime`"
                    :rules="[{ required: true, message: '请选择值班时间' }]"
                  >
                    <el-select
                      v-model="scheduleForm[index].dutyTime"
                      placeholder="请选择值班时间"
                      style="width: 200px"
                    >
                      <el-option
                        label="上午 8:00-12:00"
                        value="上午 8:00-12:00"
                      />
                      <el-option
                        label="下午 14:00-18:00"
                        value="下午 14:00-18:00"
                      />
                      <el-option
                        label="全天 8:00-18:00"
                        value="全天 8:00-18:00"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>
            <el-form-item v-if="staffData.length > 0">
              <el-button type="primary" native-type="submit" :icon="Save">
                保存排班
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <!-- 系统设置 -->
      <el-tab-pane name="settings">
        <template #label>
          <span>系统设置</span>
        </template>
        <el-card class="settings-card">
          <div class="settings-content">
            <el-button
              type="primary"
              :icon="Key"
              @click="handlePasswordModal"
              class="setting-button"
            >
              修改管理员密码
            </el-button>
            <el-button
              type="primary"
              :icon="Info"
              @click="handleHospitalModal"
              class="setting-button"
            >
              修改医院简介
            </el-button>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- 人员信息编辑模态框 -->
    <el-dialog
      :title="editingStaff ? '编辑人员信息' : '添加人员信息'"
      v-model="staffModalVisible"
      @close="handleStaffModalClose"
      width="500px"
    >
      <el-form
        ref="staffFormRef"
        :model="staffForm"
        :rules="staffRules"
        label-position="top"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="staffForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="科室" prop="department">
          <el-select v-model="staffForm.department" placeholder="请选择科室">
            <el-option
              v-for="dept in departments"
              :key="dept"
              :label="dept"
              :value="dept"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="staffForm.position" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="照片URL" prop="avatar">
          <el-input
            v-model="staffForm.avatar"
            placeholder="请输入照片URL（可选）"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleStaffSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 密码修改模态框 -->
    <el-dialog
      title="修改管理员密码"
      v-model="passwordModalVisible"
      @close="handlePasswordModalClose"
      width="400px"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-position="top"
      >
        <el-form-item label="当前密码" prop="currentPassword">
          <el-input
            v-model="passwordForm.currentPassword"
            type="password"
            placeholder="请输入当前密码"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请确认新密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePasswordChange"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 医院信息修改模态框 -->
    <el-dialog
      title="修改医院简介"
      v-model="hospitalModalVisible"
      @close="handleHospitalModalClose"
      width="600px"
    >
      <el-form
        ref="hospitalFormRef"
        :model="hospitalForm"
        :rules="hospitalRules"
        label-position="top"
      >
        <el-form-item label="医院名称" prop="name">
          <el-input v-model="hospitalForm.name" placeholder="请输入医院名称" />
        </el-form-item>
        <el-form-item label="医院简介" prop="introduction">
          <el-input
            v-model="hospitalForm.introduction"
            type="textarea"
            :rows="2"
            placeholder="请输入医院简介"
          />
        </el-form-item>
        <el-form-item label="医院地址" prop="address">
          <el-input
            v-model="hospitalForm.address"
            placeholder="请输入医院地址"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="hospitalForm.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="急诊电话" prop="emergencyPhone">
          <el-input
            v-model="hospitalForm.emergencyPhone"
            placeholder="请输入急诊电话"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleHospitalInfoChange"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, defineOptions, onUnmounted, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import CryptoJS from "crypto-js";
import { updatePassword } from "../services/admin";
import { updateHospitalInfo, queryHospitalInfo } from "../services/hospital";
import { importStaffData, queryAllStaffs } from "../services/staff";

defineOptions({
  name: "AdminPage",
});

// 状态管理
const activeTab = ref("import");
const staffData = ref([]);
const scheduleData = ref([]);
const hospitalInfo = ref({});
const departments = ref(["内科", "外科", "妇产科", "儿科", "急诊科"]);
const scheduleForm = ref([]);

// 模态框状态
const staffModalVisible = ref(false);
const passwordModalVisible = ref(false);
const hospitalModalVisible = ref(false);
const editingStaff = ref(null);

// 表单引用
const staffFormRef = ref(null);
const passwordFormRef = ref(null);
const hospitalFormRef = ref(null);

// 表单数据
const staffForm = reactive({
  name: "",
  department: "",
  position: "",
  avatar: "",
});

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const hospitalForm = reactive({
  name: "",
  introduction: "",
  departments: [],
});

// 表单规则
const staffRules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  department: [{ required: true, message: "请选择科室", trigger: "change" }],
  position: [{ required: true, message: "请输入职位", trigger: "blur" }],
};

const passwordRules = {
  currentPassword: [
    { required: true, message: "请输入当前密码", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, message: "密码长度不能小于6位", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请确认新密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请确认新密码"));
        } else if (value !== passwordForm.newPassword) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

const hospitalRules = {
  name: [{ required: true, message: "请输入医院名称", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入医院简介", trigger: "blur" },
  ],
  departments: [
    { required: true, message: "请输入医院科室", trigger: "change" },
  ],
};

const staffTableContainer = ref(null);

// 加载数据
onMounted(() => {
  loadStaffData();
  loadScheduleData();
  loadHospitalInfo();
});

// 移除窗口大小变化事件监听器
onUnmounted(() => {
});

// 加载人员数据
const loadStaffData = () => {
  queryAllStaffs()
    .then((res) => {
      if (res) {
        staffData.value = res;
        // 初始化排班表单
        scheduleForm.value = staffData.value.map((item) => ({
          staff: item.name,
          department: item.department,
          position: item.position,
          avatar: item.avatar,
          dutyTime: "",
        }));
        nextTick(() => updateStaffTableHeight());
      } else {
        ElMessage.error("查询人员信息失败");
      }
    })
    .catch((e) => {
      console.error("Failed to query staff data:", e);
      ElMessage.error("查询人员信息失败");
    });
};

// 加载排班数据
const loadScheduleData = () => {
  const savedSchedule = localStorage.getItem("scheduleData");
  if (savedSchedule) {
    try {
      scheduleData.value = JSON.parse(savedSchedule);
    } catch (e) {
      console.error("Failed to parse schedule data:", e);
    }
  }
};

// 加载医院信息
const loadHospitalInfo = () => {
  // 从后端查询医院信息
  queryHospitalInfo()
    .then((res) => {
      if (res) {
        hospitalInfo.value = res;
        hospitalForm.name = res.name;
        hospitalForm.introduction = res.introduction;
        hospitalForm.address = res.address;
        hospitalForm.phone = res.phone;
        hospitalForm.emergencyPhone = res.emergencyPhone;
      } else {
        ElMessage.error("查询医院信息失败");
      }
    })
    .catch((e) => {
      console.error("Failed to query hospital info:", e);
      ElMessage.error("查询医院信息失败");
    });
};

// 处理Excel导入
const handleImport = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  // 调用后端上传接口
  importStaffData(formData)
    .then((response) => {
      ElMessage.success("文件上传成功");
      loadStaffData(); // 重新加载人员数据
    })
    .catch((error) => {
      ElMessage.error("文件上传失败: " + error.message);
    });

  return false; // 阻止默认上传
};

// 添加人员
const handleAddStaff = () => {
  editingStaff.value = null;
  Object.keys(staffForm).forEach((key) => {
    staffForm[key] = "";
  });
  staffModalVisible.value = true;
};

// 编辑人员
const handleEditStaff = (row) => {
  editingStaff.value = row;
  Object.assign(staffForm, row);
  staffModalVisible.value = true;
};

// 保存人员信息
const handleStaffSave = async () => {
  try {
    await staffFormRef.value.validate();
    let newData;
    if (editingStaff.value) {
      // 更新现有人员
      newData = staffData.value.map((item) =>
        item.id === editingStaff.value.id ? { ...item, ...staffForm } : item
      );
    } else {
      // 添加新人员
      const newId =
        staffData.value.length > 0
          ? Math.max(...staffData.value.map((item) => item.id)) + 1
          : 1;
      newData = [...staffData.value, { ...staffForm, id: newId }];

      // 更新排班表单
      scheduleForm.value.push({
        staff: staffForm.name,
        department: staffForm.department,
        position: staffForm.position,
        avatar: staffForm.avatar,
        dutyTime: "",
      });

      // 更新科室列表
      if (!departments.value.includes(staffForm.department)) {
        departments.value.push(staffForm.department);
      }
    }

    // 保存到localStorage
    localStorage.setItem("staffData", JSON.stringify(newData));
    staffData.value = newData;
    staffModalVisible.value = false;
    ElMessage.success("保存成功");
  } catch (error) {
    // 表单验证失败
    console.error("Form validation error:", error);
  }
};

// 删除人员
const handleStaffDelete = (id) => {
  ElMessageBox.confirm("确定要删除这条人员信息吗？", "确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const newData = staffData.value.filter((item) => item.id !== id);
      localStorage.setItem("staffData", JSON.stringify(newData));
      staffData.value = newData;

      // 更新排班表单
      const index = scheduleForm.value.findIndex(
        (item) => item.staff === staffData.value.find((s) => s.id === id)?.name
      );
      if (index > -1) {
        scheduleForm.value.splice(index, 1);
      }

      ElMessage.success("删除成功");
    })
    .catch(() => {
      // 用户取消删除
    });
};

// 保存排班
const handleScheduleSave = () => {
  const newSchedule = scheduleForm.value
    .filter((item) => item.dutyTime)
    .map((item, index) => ({
      id: index + 1,
      name: item.staff,
      department: item.department,
      position: item.position,
      dutyTime: item.dutyTime,
      avatar: item.avatar,
    }));

  localStorage.setItem("scheduleData", JSON.stringify(newSchedule));
  scheduleData.value = newSchedule;
  ElMessage.success("排班保存成功");
};

// 打开密码修改模态框
const handlePasswordModal = () => {
  Object.keys(passwordForm).forEach((key) => {
    passwordForm[key] = "";
  });
  passwordModalVisible.value = true;
};

// 修改密码
const handlePasswordChange = async () => {
  try {
    await passwordFormRef.value.validate();
    const { currentPassword, newPassword } = passwordForm;

    const hashedCurrentPassword = CryptoJS.MD5(currentPassword).toString();
    const hashedNewPassword = CryptoJS.MD5(newPassword).toString();
    const res = await updatePassword({
      oldPassword: hashedCurrentPassword,
      newPassword: hashedNewPassword,
    });
    if (res.success) {
      passwordModalVisible.value = false;
      ElMessage.success("密码修改成功");
    }
  } catch (error) {
    // 表单验证失败
    console.error("Form validation error:", error);
  }
};

// 打开医院信息修改模态框
const handleHospitalModal = () => {
  Object.assign(hospitalForm, hospitalInfo.value);
  hospitalModalVisible.value = true;
};

// 修改医院信息
const handleHospitalInfoChange = async () => {
  try {
    await hospitalFormRef.value.validate();
    const res = await updateHospitalInfo(hospitalForm);
    if (res) {
      loadHospitalInfo(); // 刷新医院信息
      hospitalModalVisible.value = false;
      ElMessage.success("医院信息修改成功");
    }
  } catch (error) {
    // 表单验证失败
    console.error("Form validation error:", error);
  }
};

// 关闭人员信息模态框
const handleStaffModalClose = () => {
  if (staffFormRef.value) {
    staffFormRef.value.resetFields();
  }
  editingStaff.value = null;
};

// 关闭密码修改模态框
const handlePasswordModalClose = () => {
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields();
  }
};

// 关闭医院信息模态框
const handleHospitalModalClose = () => {
  if (hospitalFormRef.value) {
    hospitalFormRef.value.resetFields();
  }
};
</script>

<style lang="less" scoped>
@import "../styles/AdminPage.less";
</style>
