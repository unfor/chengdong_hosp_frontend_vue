<template>
  <div class="hospital-intro-container">
    <div class="intro-header">
      <h2 class="hospital-title">{{ hospitalInfo.name }}</h2>
      <el-link v-if="isAdmin" type="primary" class="edit-hint">
        (管理员可在设置页面修改医院信息)
      </el-link>
    </div>
    
    <el-card class="intro-card">
      <div class="intro-content">
        <p>{{ hospitalInfo.introduction }}</p>
      </div>
    </el-card>

    <el-card class="departments-card" :title="'医院科室'">
      <div class="departments-list">
        <div 
          v-for="(dept, index) in hospitalInfo.departments" 
          :key="index" 
          class="department-item"
        >
          {{ dept }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'


export default {
  name: 'HospitalIntro',
  setup() {
    const hospitalInfo = ref({
      name: 'XX医院',
      introduction: 'XX医院是一家综合性三级甲等医院，始建于1950年，是本地区医疗、教学、科研中心。医院占地面积约10万平方米，建筑面积25万平方米，开放床位2000张。医院拥有一支高素质的医护团队，其中高级职称专业技术人员300余人，博士、硕士导师50余人。\n\n医院设有内科、外科、妇产科、儿科、急诊科、重症医学科、麻醉科、检验科、影像科等40余个临床医技科室。拥有先进的医疗设备，如3.0T核磁共振、64排螺旋CT、直线加速器、数字化X光机等。\n\n医院始终坚持"以病人为中心"的服务理念，不断提高医疗质量和服务水平，为广大患者提供优质、高效、便捷的医疗服务。医院先后获得"全国文明单位"、"全国卫生系统先进集体"、"全国百姓放心示范医院"等荣誉称号。',
      departments: [
        '内科', '外科', '妇产科', '儿科', '急诊科',
        '重症医学科', '麻醉科', '检验科', '影像科', '口腔科'
      ]
    })
    const isAdmin = ref(false)

    onMounted(() => {
      // 检查是否是管理员
      const adminToken = localStorage.getItem('adminToken')
      isAdmin.value = !!adminToken

      // 从localStorage加载医院信息
      const savedInfo = localStorage.getItem('hospitalInfo')
      if (savedInfo) {
        try {
          hospitalInfo.value = JSON.parse(savedInfo)
        } catch (e) {
          console.error('Failed to parse hospital info:', e)
        }
      }
    })

    return {
      hospitalInfo,
      isAdmin
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/HospitalIntro.less';
</style>