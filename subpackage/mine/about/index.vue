<template>
	<view class="page-about">
		<!-- 标题栏 -->
		<u-navbar :placeholder="true" :autoBack="true" title="关于我们">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<image :src="cdnUrl + '/mine/logo-w.png'" class="logo"></image>
		<view class="app-name">脑悦康</view>
		<view class="app-version">V0813</view>
		<view class="app-description">
			脑悦康，中国首个数据共享、生态合作的脑健康普惠平台。守护数十亿阿尔茨海默症、睡眠障碍、抑郁等脑神经退行性疾病患者的大脑健康，让大脑年轻十岁！
		</view>
		<view class="tel" @click="call">
			<text>商务合作</text>
			<view class="tel-text">
				<text>028-85283888转832</text>
				<u-icon :name="cdnUrl + '/mine/right-g.png'" width="12rpx" height="21rpx"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	data() {
		return {
			cdnUrl
		};
	},
	methods: {
		call() {
			uni.makePhoneCall({
				phoneNumber: '02885283888'
			});
		}
	},
	//分享
	onShareAppMessage(res) {
		const sourceTime = new Date().getTime();
		const inviteCode = this.$store.state.user.inviteCode;
		return {
			title: '脑悦康',
			path: '/pages/launch/index?r_c=' + inviteCode + '&sourceTime=' + sourceTime
		};
	}
};
</script>

<style lang="scss" scoped>
.page-about {
	min-height: 100vh;
	padding: 0 76rpx;
	background-color: #f5f5f5;

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

	.logo {
		display: block;
		width: 160rpx;
		height: 160rpx;
		margin: 146rpx auto 0 auto;
	}

	.app-name {
		margin-top: 40rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #28aaff;
		text-align: center;
		letter-spacing: 10rpx;
	}

	.app-version {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #888;
		text-align: center;
	}

	.app-description {
		margin-top: 150rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		color: #888;
	}

	.tel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 28rpx;
		margin-top: 40rpx;
		background-color: #fff;
		border-radius: 10rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}

	.tel-text {
		display: flex;
		align-items: center;
	}

	/deep/ .u-icon {
		margin-left: 20rpx;
	}
}
</style>
