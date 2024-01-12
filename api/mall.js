import request from "@/utils/request"

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