<template>
	<view class="page-setting">
		<!-- 标题栏 -->
		<u-navbar :placeholder="true" :autoBack="true" title="设置">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<u-cell-group :border="false">
			<u-cell :border="false">
				<button class="feedback-button" slot="title" open-type="feedback">建议反馈</button>
				<u-icon slot="right-icon" :name="cdnUrl + '/mine/right-g.png'" width="16rpx" height="28rpx"></u-icon>
			</u-cell>
			<u-cell :border="false" title="联系我们" url="/subpackage/mine/about/index">
				<u-icon slot="right-icon" :name="cdnUrl + '/mine/right-g.png'" width="16rpx" height="28rpx"></u-icon>
			</u-cell>
		</u-cell-group>
		<view class="login-button" @click="logout" v-if="isLogin">退出登录</view>
		<view class="login-button primary" @click="navigateTo" v-else>登录</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	data() {
		return {
			cdnUrl,
			isLogin: this.$store.state.user.isLogin
		};
	},
	methods: {
		// 退出登录
		logout() {},
		// 跳转登录页面
		navigateTo() {
			this.$tab.navigateTo('/pages/login/index');
		}
	}
};
</script>

<style lang="scss" scoped>
.page-setting {
	min-height: 100vh;
	background-color: #f7f7f7;

	/deep/ .u-navbar__content__left {
		padding: 0;
	}

	.back-button {
		width: 100rpx;
		height: 74rpx;
		padding: 20rpx 40rpx;
	}

	.back-icon {
		width: 20rpx;
		height: 34rpx;
	}

	/deep/ .u-navbar__content__title {
		font-size: 34rpx;
		font-weight: bold;
		color: #000;
	}

	/deep/ .u-cell-group {
		margin-top: 20rpx;
		background-color: #fff;
	}

	/deep/ .u-cell {
		padding: 0 30rpx 0 40rpx;
		&:first-child {
			.u-cell__body {
				border-bottom: 2rpx solid #f0f5f4;
			}
		}
	}

	/deep/ .u-cell__body {
		padding: 35rpx 0;
	}

	/deep/ .u-cell__title-text {
		line-height: 48rpx;
		font-size: 34rpx;
		color: #242426;
	}

	.feedback-button {
		margin: 0;
		padding: 0;
		line-height: normal;
		background: none;
		border: none;
		font-size: 34rpx;
		color: #242426;
		text-align: left;
		&::after {
			display: none;
		}
	}

	.login-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		height: 88rpx;
		margin: 60rpx auto 0;
		background-color: #5975ff;
		border-radius: 10rpx;
		font-size: 34rpx;
		color: #fff;
	}
}
</style>
