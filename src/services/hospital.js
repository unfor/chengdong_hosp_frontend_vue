import request from './request'

/**
 * 查询医院基础信息
 */
export const queryHospitalInfo = () => {
  return request({
    url: '/hospital/query-info',
    method: 'GET'
  })
}

/**
 * 修改医院基础信息
 * @param {Object} data - 医院信息数据
 * @param {string} data.name - 医院名称
 * @param {string} data.address - 医院地址
 * @param {string} data.phone - 联系电话
 * @param {string} data.emergencyPhone - 急诊电话
 * @param {string} data.overview - 医院简介
 * @param {string} data.foundedYear - 成立年份
 * @param {string} data.website - 官方网站
 */
export const updateHospitalInfo = (data) => {
  return request({
    url: '/admin/hospital/update-info',
    method: 'POST',
    data
  })
}
    