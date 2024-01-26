<template>
	<u-popup
		:show="show"
		:closeOnClickOverlay="false"
		:safeAreaInsetBottom="false"
		mode="center"
		duration="0"
		overlayOpacity="0.6"
		round="24rpx"
		bgColor="transparent"
		@close="close"
		@open="open"
	>
		<view class="rule-content">
			<image :src="cdnUrl + '/newYue/close_icon_02.png'" class="close-button" @click="close"></image>
			<image :src="cdnUrl + '/nyk_data/activity/activity_turntable_pic/2023-10-16/NDDWc5Jz4p.png'" class="rule-background" mode="widthFix"></image>
			<view class="rule-title">规则说明</view>
			<rich-text class="rule-text" :nodes="rule"></rich-text>
		</view>
	</u-popup>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	name: 'popup-rule',
	props: {
		rule: String // 规则内容
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl,
			show: false
		};
	},
	methods: {
		open() {
			this.show = true;
		},
		close() {
			this.show = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.rule-content {
	position: relative;
	width: 600rpx;
	padding: 60rpx 40rpx 40rpx 40rpx;
	line-height: 52rpx;
	border-radius: 24rpx;
	background-color: #ffffff;
	font-size: 28rpx;
	color: #636366;
	white-space: pre-line;
}

.close-button {
	position: absolute;
	right: 0;
	top: -72rpx;
	width: 64rpx;
	height: 64rpx;
}

.rule-background {
	position: absolute;
	width: 100%;
	left: 0;
	right: 0;
	top: 0;
	z-index: 0;
}

.rule-title {
	position: relative;
	line-height: 60rpx;
	font-size: 48rpx;
	color: #ffffff;
	z-index: 1;
}

.rule-text {
	margin-top: 230rpx;
	padding: 40rpx;
}
</style>
