import {
	getProductCategories,
	getProductsByCategoryId,
	getHotSearchProducts,
	getProductList,
	getProductDetail,
	getReplyList,
	getPickupList,
	getBarrageReply,
	getCouponList
} from "@/api/mall";

const system = {
	state: {},

	mutations: {},

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
	},
};

export default system;