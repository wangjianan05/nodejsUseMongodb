import store from '../store/index'
/**
 * 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 * @param perms
 */
export function permission (perms) {
  let permissions = store.state.user.perms
  return permissions.indexOf(perms) !== -1 || false
}
