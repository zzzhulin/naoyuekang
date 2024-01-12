import request from "@/utils/request"

export function getLanternBanner(params) {
	return request({
		url: "/small/api/v1/lantern/common/getLanternBannerV3_7_1",
		params,
	})
}

export function getHotList() {
	return request({
		url: "/small/api/special/getHotList",
	})
}

export function getAppStatus() {
	return request({
		url: "/small/api/v1/small/user/common/appStatus",
	})
}

export function getSectionList(params) {
	return request({
		url: "/small/api/v1/small/section/getSectionList",
		params,
	})
}

export function getArticlesBySectionId(params) {
	return request({
		url: "/small/api/v1/small/section/getArticlesBySectionId",
		params,
	})
}

export function getCategoryListBySectionId(params) {
	return request({
		url: "/small/api/v1/small/category/getCategoryListBySectionIdV3_9",
		params,
	})
}

export function getCategoryListByCategoryId(params) {
	return request({
		url: "/small/api/v1/small/category/getCategoryListByCategoryIdV3_9",
		params,
	})
}