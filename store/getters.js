const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
	appStatus: (state) => state.system.appStatus,
}
export default getters
