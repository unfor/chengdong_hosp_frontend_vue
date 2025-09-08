import request from './request'

/**
 * 管理员登录
 * @param {Object} params - 登录参数
 * @param {string} params.username - 用户名
 * @param {string} params.password - 密码
 */
export const adminLogin = (params) => {
  return request({
    url: '/admin/login',
    method: 'POST',
    data: params
  })
}

/**
 * 管理员登出
 */
export const adminLogout = () => {
  return request({
    url: '/admin/logout',
    method: 'GET'
  })
}

/**
 * 修改密码
 * @param {Object} data - 密码修改数据
 * @param {string} data.oldPassword - 原密码
 * @param {string} data.newPassword - 新密码
 */
export const updatePassword = (data) => {
  return request({
    url: '/admin/update-pass', // 修正了原接口的拼写错误
    method: 'POST',
    data
  })
}
