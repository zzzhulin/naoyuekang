import request from "@/utils/request"

export function getUserInfo() {
	return request({
		url: "/osapi/user/infoGet",
		isPhp: true
	})
}

export function getProductCategories(params) {
	return request({
		url: "/nykapi/v2.product/get_product_categories",
		params,
		isPhp: true
	})
}

export function getProductsByCategoryId(params) {
	return request({
		url: "/nykapi/v2.product/get_products_by_cateid",
		params,
		isPhp: true
	})
}

export function getHotSearchProducts() {
	return request({
		url: "/ebapi/store_api/get_routine_hot_search",
		isPhp: true
	})
}

export function getProductList(params) {
	return request({
		url: "/nykapi/v1.product/getlist",
		params,
		isPhp: true
	})
}

export function getProductDetail(params) {
	return request({
		url: "/ebapi/store_api/details",
		params,
		isPhp: true
	})
}

export function getReplyList(params) {
	return request({
		url: "/nykapi/reply/getReplyList",
		params,
		isPhp: true
	})
}

export function getPickupList(params) {
	return request({
		url: "/nykapi/reply/getPickupList",
		params,
		isPhp: true
	})
}

export function getBarrageReply(params) {
	return request({
		url: "/nykapi/reply/getBarrageReply",
		params,
		isPhp: true
	})
}

export function getCouponList(params) {
	return request({
		url: "/ebapi/coupons_api/get_issue_coupon_list",
		params,
		isPhp: true
	})
}

export function createProductPoster(params) {
	return request({
		url: "/shareapi/index/create_product_poster",
		method: 'POST',
		data: params,
		isPhp: true
	})
}

export function getActivitySetting(params) {
	return request({
		url: "/nykapi/v1.landing_page/get_activity_setting",
		params,
		isPhp: true
	})
}

export function getNovemberActivityV4_1(params) {
	return request({
		url: "/small/api/share/getNovemberActivityV4_1",
		params,
	})
}

export function getReplyDetail(params) {
	return request({
		url: "/nykapi/reply/getReplyDetail",
		params,
		isPhp: true
	})
}


export function getCartLimit() {
	return request({
		url: "/nykapi/Product/getCartLimit",
		isPhp: true
	})
}
