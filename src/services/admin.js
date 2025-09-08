import request from './request'

/**
 * 管理员登录
 * @param {Object} data - 登录参数
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 */
export const adminLogin = (data) => {
  return request({
    url: '/admin/login',
    method: 'POST',
    data
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
    url: '/admin/update-password', // 修正了原接口的拼写错误
    method: 'POST',
    data
  })
}
