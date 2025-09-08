import request from './request'

/**
 * 查询值班人员信息
 * @param {Object} params - 查询参数
 * @param {string} [params.department] - 科室名称
 * @param {string} [params.date] - 日期
 * @param {string} [params.shiftType] - 班次类型（早班/中班/晚班）
 */
export const queryMembersInfo = (params = {}) => {
  return request({
    url: '/members/query-info',
    method: 'GET',
    params
  })
}

/**
 * 新增人员信息
 * @param {Object} data - 人员信息数据
 * @param {string} data.name - 姓名
 * @param {string} data.department - 科室
 * @param {string} data.title - 职称
 * @param {string} data.phone - 联系电话
 * @param {string} data.specialty - 专长
 */
export const addMember = (data) => {
  return request({
    url: '/admin/members/add-member',
    method: 'POST',
    data
  })
}

/**
 * 更新人员信息
 * @param {Object} data - 人员信息数据
 * @param {number} data.id - 人员ID
 * @param {string} data.name - 姓名
 * @param {string} data.department - 科室
 * @param {string} data.title - 职称
 * @param {string} data.phone - 联系电话
 * @param {string} data.specialty - 专长
 */
export const updateMember = (data) => {
  return request({
    url: '/admin/members/update-member', // 修正了原接口的拼写错误
    method: 'POST',
    data
  })
}

/**
 * 排班接口
 * @param {Object} data - 排班信息数据
 * @param {string} data.date - 日期
 * @param {Array} data.shifts - 排班详情
 * @param {number} data.shifts[].memberId - 人员ID
 * @param {string} data.shifts[].department - 科室
 * @param {string} data.shifts[].shiftType - 班次类型
 */
export const arrangeDuty = (data) => {
  return request({
    url: '/admin/members/arrange-duty',
    method: 'POST',
    data
  })
}
    