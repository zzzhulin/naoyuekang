import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'
import {
	getOpenId,
	getVeryCode,
	login,
	getUserInfo
} from '@/api/user'

const user = {
	state: {
		isLogin: false,
		inviteCode: '',
		token: '',
		thirdToken: '',
		userId: '',
		userName: '',
	},

	mutations: {
		setIsLogin: (state, data) => {
			state.isLogin = data
		},
		setToken: (state, data) => {
			state.token = data
		},
		setThirdToken: (state, data) => {
			state.thirdToken = data
		},
		setUserId: (state, data) => {
			state.userId = data;
		},
		setUserName: (state, data) => {
			state.userName = data;
		},
		setInviteCode: (state, data) => {
			state.inviteCode = data
		},
	},

	actions: {
		// 获取openId
		GetOpenId({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getOpenId(params)
					.then((res) => {
						resolve(res.data.openId || '');
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		// 获取验证码
		GetVeryCode({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getVeryCode(params)
					.then((res) => {
						resolve(res);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		// 登录
		Login({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				login(params)
					.then((res) => {
						setIsLogin(true);
						setToken(res.access_token);
						storage.set(constant.thirdToken, res.thirdToken);
						commit('setToken', res.access_token);
						commit('setThirdToken', res.thirdToken);
						commit('setUserId', res.userId);
						commit('setUserName', res.userName);
						resolve(res);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		// 退出登录
		Logout({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('setToken', '')
					removeToken()
					storage.clean()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 获取用户信息
		GetUserInfo({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getUserInfo()
					.then((res) => {
						commit('setInviteCode', res.data.invite_code)
						resolve(res.data || null);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
	}
}

export default user