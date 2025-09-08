import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量获取基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 添加token
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    ElMessage.error('请求发送失败，请稍后重试')
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 假设后端统一返回格式为 { status: 200, data: ..., message: '' }
    const res = response.data
    
    // 业务逻辑错误处理
    if (response.status !== 200) {
      ElMessage.error(response.message || '操作失败')
      return Promise.reject(new Error(response.message || 'Error'))
    }
    
    return res
  },
  error => {
    // HTTP状态码错误处理
    if (error.response) {
      switch (error.response.status) {
        case 400:
          ElMessage.error(error.response.data.error)
          break
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('adminToken')
          ElMessageBox.alert('登录已过期，请重新登录', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              window.location.href = '/'
            }
          })
          break
        case 403:
          ElMessage.error('没有操作权限')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(`请求错误: ${error.response.status}`)
      }
    } else {
      ElMessage.error('网络连接错误，请检查网络')
    }
    return Promise.reject(error)
  }
)

export default request
    