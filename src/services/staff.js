import request from "./request";

/**
 * 查询值班人员信息
 * @param {Object} params - 查询参数
 * @param {string} [params.department] - 科室名称
 * @param {string} [params.date] - 日期
 */
export const queryDutyInfo = (params = {}) => {
  return request({
    url: "/staffs/query-duty",
    method: "GET",
    params,
  });
};

/**
 * 排班接口
 * @param {Object} data - 排班信息数据
 * @param {string} data.date - 日期
 * @param {Array} data.shifts - 排班详情
 * @param {number} data.shifts[].staffId - 人员ID
 * @param {string} data.shifts[].department - 科室
 */
export const arrangeDuty = (data) => {
  return request({
    url: "/admin/arrange-duty",
    method: "POST",
    data,
  });
};

/**
 * 获取所有人员信息
 */
export const queryAllStaffs = () => {
  return request({
    url: "/staffs/get-all-staffs",
    method: "GET",
  });
};

/**
 * 新增人员信息
 * @param {Object} data - 人员信息数据
 * @param {string} data.name - 姓名
 * @param {string} data.department - 科室
 * @param {string} data.title - 职称
 * @param {string} data.phone - 联系电话
 * @param {string} data.specialty - 专长
 */
export const addStaff = (data) => {
  return request({
    url: "/admin/staffs/add-staff",
    method: "POST",
    data,
  });
};

export const importStaffData = (formData) => {
  return request({
    url: "/admin/staffs/import-staff-data",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

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
export const updateStaff = (data) => {
  return request({
    url: "/admin/staffs/update-staff", // 修正了原接口的拼写错误
    method: "POST",
    data,
  });
};

