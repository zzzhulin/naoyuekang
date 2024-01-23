import {
	getProductCategories,
	getProductsByCategoryId,
	getHotSearchProducts,
	getProductList,
	getProductDetail,
	getReplyList,
	getPickupList,
	getBarrageReply,
	getCouponList,
	createProductPoster,
	getActivitySetting,
	getNovemberActivityV4_1,
	getReplyDetail,
	getCartLimit
} from "@/api/mall";

const mall = {
	state: {
		actionLogId: '',
	},

	mutations: {
		setActionLogId: (state, data) => {
			state.actionLogId = data
		},
	},

	actions: {
		GetProductCategories({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getProductCategories(params)
					.then((res) => {
						resolve(res.data.archives || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetProductsByCategoryId({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getProductsByCategoryId(params)
					.then((res) => {
						resolve(res.data.list.archives || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetHotSearchProducts({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getHotSearchProducts()
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetProductList({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getProductList(params)
					.then((res) => {
						resolve(res.data.archives || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetProductDetail({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getProductDetail(params)
					.then((res) => {
						commit('setActionLogId', res.data.action_log_id)
						resolve(res.data || null);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetReplyList({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getReplyList(params)
					.then((res) => {
						const {
							count = 0, data = []
						} = res;
						resolve({
							count,
							data
						});
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetPickupList({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getPickupList(params)
					.then((res) => {
						const {
							count = 0, data = []
						} = res;
						resolve({
							count,
							data
						});
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetBarrageReply({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getBarrageReply(params)
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetCouponList({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getCouponList(params)
					.then((res) => {
						resolve(res.data || []);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		CreateProductPoster({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				createProductPoster(params)
					.then((res) => {
						resolve(res.data.poster || '');
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetActivitySetting({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getActivitySetting(params)
					.then((res) => {
						resolve(res.data || null);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetNovemberActivityV4_1({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getNovemberActivityV4_1(params)
					.then((res) => {
						resolve(res.data || '');
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetReplyDetail({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				getReplyDetail(params)
					.then((res) => {
						resolve(res.data || null);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		GetCartLimit({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getCartLimit(params)
					.then((res) => {
						resolve(res.data || '');
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
	},
};

export default mall;