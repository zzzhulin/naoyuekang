import store from '@/store'

function authPermission(permission) {
	const all_permission = "*:*:*"
	const permissions = store.getters && store.getters.permissions
	if (permission && permission.length > 0) {
		return permissions.some(v => {
			return all_permission === v || v === permission
		})
	} else {
		return false
	}
}

function authRole(role) {
	const super_admin = "admin"
	const roles = store.getters && store.getters.roles
	if (role && role.length > 0) {
		return roles.some(v => {
			return super_admin === v || v === role
		})
	} else {
		return false
	}
}

export default {
	// 验证用户是否具备某权限
	hasPermi(permission) {
		return authPermission(permission)
	},
	// 验证用户是否含有指定权限，只需包含其中一个
	hasPermiOr(permissions) {
		return permissions.some(item => {
			return authPermission(item)
		})
	},
	// 验证用户是否含有指定权限，必须全部拥有
	hasPermiAnd(permissions) {
		return permissions.every(item => {
			return authPermission(item)
		})
	},
	// 验证用户是否具备某角色
	hasRole(role) {
		return authRole(role)
	},
	// 验证用户是否含有指定角色，只需包含其中一个
	hasRoleOr(roles) {
		return roles.some(item => {
			return authRole(item)
		})
	},
	// 验证用户是否含有指定角色，必须全部拥有
	hasRoleAnd(roles) {
		return roles.every(item => {
			return authRole(item)
		})
	},
	// 验证用户是否登录
	checkLogin() {
		const isLogin = store.getters && store.getters.isLogin;
		if (isLogin) {
			return true;
		} else {
			uni.showModal({
				title: "提示",
				content: "尊敬的用户，该功能需要获取您的用户信息，仅仅用作判断您是否拥有该功能的使用权限。",
				cancelText: "暂不登录",
				confirmText: "去登录",
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: "/pages/login/login",
						});
					}
				},
			});
		}
		return false;
	}
}