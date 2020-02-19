/*
 * @module: 工具类 - 提示语
 * @fileName: tip.js
 * @Description: 用于存放项目中所有的提示语
 * @Author: LiSuwan
 * @Date: 2019-04-01 10:57:42
 */

export default {
  /* ================= 公共模块 start ============= */
  deleteOk: '删除成功！',
  editOk: '编辑成功！',
  addOk: '添加成功！',
  titleName: '提示',
  networkError: '网络错误请稍后再试！',
  noNuthority: '暂无权限，请退出重新登录！',
  LogonFailure: '登录失效，请退出重新登录',
  tableTipText: '加载中...',
  confirmDelete: '确认要删除这条信息吗？',
  createSuccess: '恭喜你创建成功！',
  searchContent: '请输入搜索条件',
  /* ================= 公共模块 end ============= */

  /* ================= 登录注册模块 start ============= */
  userNameDefault: '英文和数字均可，20个字符以内',
  userNameTip: '请输入正确的用户名格式,20个字符以内',
  emailDefault: '请输入正确的邮箱地址',
  emailTip: '请输入正确的邮箱地址',
  passwordDefault: '请设置登录密码，10个字符以内',
  passwordTip: '请输入正确的密码格式,5-18位',
  confirmPasswordDefault: '请确认登录密码',
  confirmPasswordTip: '密码输入不相同',
  codeDefault: '请输入发送到邮箱里的验证码',
  codeTip: '验证码错误',
  /* ================= 登录注册模块 end ============= */

  /* ================= 设备管理${equipment} start ============= */
  equipmentAddMPNameTips: '支持中/英文、数字，长度限制1~50个字符',
  equipmentAddDatypeTips: '请输入数据类型，长度限制1~20个字符',
  equipmentAddUnitTips: '请输入测点单位，长度限制1~10个字符',
  equipmentAddAttrTips: '请输入测点属性，长度限制1~50个字符',
  equipmentAddNameTips: '请输入设备名称，长度限制4~30个字符',
  equipmentAddDescTips: '请输入描述信息，文字限长100个字符',
  equipmentUsing: '当前产品已在使用中，请先删除相关的设备后再删除此产品。',
  equipmentHasExist: '测点名已存在，请重新设置！',
  equipmentTypeNameEmpty: '产品名称不能为空',
  equipmentSelectProductName: '请选择产品名称',
  equipmentNameEmpty: '设备名称不能为空！',
  equipmentSNEmpty: '设备SN不能为空！',
  equipmentTypeSelect: '请选择产品名称',
  equipmentTypeNameRule: '只能包含中/英文、数字和下划线',
  equipmentTypeNameExited: '产品名称已存在',
  equipmentNameExited: '设备名称已存在',
  equipmentTypeNameLength: '长度限制4-30个字符',
  equipmentTypeSNLength: '长度限制8-36位',
  equipmentTypeNamePlaceholder: '支持中/英文，数字和下划线，长度限制4-30个字符',
  equipmentTypePointsEmpty: '测点不能为空',
  equipmentTypeDescLength: '长度限制100个字符',
  equipmentTypeDescExceed: '字数超出',
  equipmentTypeDescPlaceholder: '请输入100个字符以内的描述信息',
  equipmentTypeAddedSuccess: '成功添加产品！',
  equipmentTypeUpdatedSuccess: '成功修改产品！',
  fileType: '上传的文件格式不正确！',
  fileSize: '文件大小不能超过10M!',
  fileUploading: '文件上传中，请耐心等待！',
  fileSuccess: '上传成功！',
  equipmentNamePlaceholder: '请输入设备名称',
  equipmentSNPlaceholder: '请输入设备SN',
  equipmentNameRepeat: '设备名称重复，请重新输入',
  confirmDeleteEquipment: '是否删除此设备?',
  /* ================= 设备管理${equipment} end ============= */
  /* ================= 资产管理 start ============= */
  assetsNameExited: '资产名称已注册',
  assetsNameEmpty: '资产名称不能为空',
  isDeleteAsset: '确认删除此条资产记录?',
  regionalAsset: '资产下有区域存在,删除失败',
  invalidAssetID: '无效的资产ID',
  assetNamePlaceholder: '请输入资产名称',
  assetDescPlaceholder: '请输入资产描述，文字限长100个字符'
  /* ================= 资产管理 start ============= */
}
