import {
	getAppStatus,
	getLanternBanner,
	getHotList,
	getSectionList,
	getArticlesBySectionId,
	getCategoryListBySectionId,
	getCategoryListByCategoryId,
	getZxListByCate
} from "@/api";

const system = {
	state: {
		appStatus: '',
	},

	mutations: {
		setAppStatus: (state, data) => {
			state.appStatus = data
		},
	},

	actions: {
		GetAppStatus({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getAppStatus()
					.then((res) => {
						commit('setAppStatus',res.data.status)
						resolve(res.data.status || '');
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetLanternBanner({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getLanternBanner(params)
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetHotList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getHotList()
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetSectionList({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getSectionList(params)
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetArticlesBySectionId({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getArticlesBySectionId(params)
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetCategoryListBySectionId({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getCategoryListBySectionId(params)
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetCategoryListByCategoryId({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getCategoryListByCategoryId(params)
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetZxListByCate({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getZxListByCate(params)
					.then((res) => {
						resolve(res.data.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
	},
};

export default system;