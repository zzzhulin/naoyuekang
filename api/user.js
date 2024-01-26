import request from "@/utils/request"

export function getOpenId(params) {
	return request({
		url: '/small/api/v1/small/wx/user/openId',
		params
	})
}

export function getVeryCode(params) {
	return request({
		url: '/common/api/v1/common/sms/getVeryCode',
		params
	})
}

export function login(params) {
	return request({
		url: '/small/oauth/token',
		method: 'POST',
		data: params
	})
}

export function getUserInfo() {
	return request({
		url: "/osapi/user/infoGet",
		isPhp: true
	})
}