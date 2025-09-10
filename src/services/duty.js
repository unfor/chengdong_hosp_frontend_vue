// 导入基础请求工具
import request from './request'

/**
 * 值班信息相关API
 */
export const dutyService = {
  /**
   * 查询指定日期的值班信息
   * @param {string} date - 日期，格式为YYYY-MM-DD
   * @returns {Promise} - 返回Promise对象，包含查询结果
   */
  queryDutyByDate: (date) => {
    return request({
      url: `/staffs/query-duty/${date}`,
      method: 'GET'
    })
  },

  /**
   * 安排值班（管理员接口）
   * @param {Object} dutyData - 值班信息数据
   * @param {number} dutyData.staff_id - 员工ID
   * @param {string} dutyData.date - 日期，格式为YYYY-MM-DD
   * @param {string} dutyData.shift - 班次，如"上午"、"下午"、"晚上"
   * @returns {Promise} - 返回Promise对象，包含操作结果
   */
  arrangeDuty: (dutyData) => {
    return request({
      url: '/admin/arrange-duty',
      method: 'POST',
      data: dutyData
    })
  }
}

export default dutyService