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
 * 新增人员信息
 * @param {Object} data - 人员信息数据
 * @param {string} data.name - 姓名
 * @param {string} data.department - 科室
 * @param {string} data.position - 职位
 * @param {string} data.phone - 联系电话
 * @param {string} data.avatar - 头像
 */
export const addStaff = (data) => {
  // 如果包含头像且不为空，使用FormData格式
  if (data.rawAvatar && data.rawAvatar.startsWith('data:image/')) {
    const formData = new FormData();
    
    // 添加除头像外的其他字段
    Object.keys(data).forEach(key => {
      if (key !== 'rawAvatar') {
        formData.append(key, data[key]);
      }
    });
    
    // 处理base64头像
    if (data.rawAvatar) {
      // 将base64转换为Blob
      const base64Str = data.rawAvatar.split(',')[1];
      const byteCharacters = atob(base64Str);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      formData.append('avatar', blob, 'avatar.png');
    }
    
    return request({
      url: "/admin/staffs/add-staff",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  
  // 不包含头像或头像为空，仍然使用JSON格式
  return request({
    url: "/admin/staffs/add-staff",
    method: "POST",
    data,
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
 * @param {string} data.avatar - 头像
 */
export const updateStaff = (data) => {
  // 如果包含头像且不为空，使用FormData格式
  if (data.rawAvatar && data.rawAvatar.startsWith('data:image/')) {
    const formData = new FormData();
    
    // 添加所有字段
    Object.keys(data).forEach(key => {
      if (key !== 'rawAvatar') {
        formData.append(key, data[key]);
      }
    });
    
    // 处理base64头像
    if (data.rawAvatar) {
      // 将base64转换为Blob
      const base64Str = data.rawAvatar.split(',')[1];
      const byteCharacters = atob(base64Str);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      formData.append('avatar', blob, 'avatar.png');
    }
    
    return request({
      url: `/admin/staffs/update-staff/${data.id}`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  
  // 不包含头像或头像为空，仍然使用JSON格式
  return request({
    url: `/admin/staffs/update-staff/${data.id}`,
    method: "POST",
    data,
  });
};

/**
 * 删除人员信息
 * @param {number} id - 人员ID
 */
export const deleteStaff = (id) => {
  return request({
    url: `/admin/staffs/delete-staff/${id}`,
    method: "DELETE",
  });
};

