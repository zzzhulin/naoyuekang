<template>
	<view class="page-mine" :class="[guideShow && 'discroll']">
		<!-- 标题栏 -->
		<u-navbar bgColor="transparent">
			<view slot="left"></view>
		</u-navbar>

		<!-- 背景 -->
		<image :src="cdnUrl + '/mine/bg_07.png'" class="background" mode="widthFix"></image>

		<!-- 用户信息 -->
		<view class="user-content">
			<auth-button className="user-info">
				<image :src="cdnUrl + '/newMall/mine/img_user.png'" class="user-avatar" mode="aspectFill"></image>
				<view class="user-name">点击登录</view>
			</auth-button>
		</view>

		<!-- 账户信息 -->
		<view class="account-content">
			<block v-for="(item, index) in account" :key="item.label">
				<auth-button className="account-item">
					<view class="account-value">{{ item.value }}</view>
					<view class="account-label">{{ item.label }}</view>
				</auth-button>
				<u-line :hairline="false" direction="col" length="20rpx" color="#A3A3AD" v-if="index < account.length - 1"></u-line>
			</block>
		</view>

		<!-- svip -->
		<auth-button className="svip-content">
			<image :src="cdnUrl + '/mine/bg_09.png'" class="svip-image" mode="widthFix"></image>
		</auth-button>

		<!-- 菜单 -->
		<view class="menu-content">
			<auth-button className="menu-item" v-for="item in menu" :key="item.icon">
				<u-icon :name="cdnUrl + item.icon" width="64rpx" height="64rpx" size="64rpx"></u-icon>
				<view class="menu-label">{{ item.label }}</view>
				<view class="menu-value">
					<text v-if="item.value !== undefined">¥{{ item.value }}</text>
				</view>
			</auth-button>
		</view>

		<!-- 轮播图 -->
		<auth-button className="banner-content">
			<u-swiper
				:list="banner"
				:current="bannerIndex"
				:interval="5000"
				:duration="500"
				:circular="true"
				keyName="imgUrl"
				height="160rpx"
				radius="24rpx"
				@change="(e) => (bannerIndex = e.current)"
			>
				<view slot="indicator" class="indicator">
					<view class="indicator-line" v-for="(item, index) in banner" :key="index" :class="[index === bannerIndex && 'active']"></view>
				</view>
			</u-swiper>
		</auth-button>

		<!-- 列表 -->
		<view class="list-content">
			<view class="list" v-for="(list, index) in lists" :key="index">
				<block v-for="item in list" :key="item.title">
					<auth-button :isLogin="index === 0" className="list-item" @click="navigateTo(item.url)">
						<view class="list-left">
							<image :src="cdnUrl + item.icon" class="left-icon"></image>
							<text class="list-title">{{ item.title }}</text>
						</view>
						<view class="list-right">
							<text v-if="item.title == '测评活动'" class="right-text">{{ item.value }}</text>
							<image :src="cdnUrl + item.value" v-if="item.title === '客服'" class="right-icon"></image>
							<image :src="cdnUrl + '/health/right_g_icon_01.png'" class="right-arrow"></image>
						</view>
					</auth-button>
				</block>
			</view>
		</view>

		<!-- 漫游式引导 -->
		<image :src="cdnUrl + '/circle/mine_bg_01.png'" mode="widthFix" class="guide-content" v-if="guideShow" @click="toggleGuide"></image>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';

export default {
	data() {
		return {
			cdnUrl,
			account: [
				{
					value: 0,
					label: '余额'
				},
				{
					value: 0,
					label: '积分'
				},
				{
					value: 0,
					label: '云仓'
				},
				{
					value: 0,
					label: '优惠券'
				}
			],
			menu: [
				{
					icon: '/mine/mine_icon_09.png',
					label: '订单',
					url: ''
				},
				{
					icon: '/mine/mine_icon_10.png',
					label: '红包零钱',
					url: '',
					value: 0
				},
				{
					icon: '/mine/mine_icon_11.png',
					label: '素材库',
					url: ''
				},
				{
					icon: '/mine/mine_icon_12.png',
					label: '介绍人',
					url: ''
				}
			],
			banner: [
				{
					type: 3,
					imgUrl: cdnUrl + '/mine/bg_15.png'
				},
				{
					type: 1,
					imgUrl: cdnUrl + '/mine/bg_13.png'
				}
			],
			bannerIndex: 0,
			lists: [
				[
					{
						icon: '/report/icon_05.png',
						title: '享睡计划',
						url: ''
					},
					{
						icon: '/mine/mine_icon_18.png',
						title: '健康档案',
						url: ''
					},
					{
						icon: '/mine/mine_icon_19.png',
						title: '测评记录',
						url: ''
					},
					{
						icon: '/mine/mine_icon_20.png',
						title: '康复报告',
						url: ''
					},
					{
						icon: '/access/activity/icon_08.png',
						title: '测评活动',
						url: '',
						value: '线下机构团测'
					},
					{
						icon: '/mine/mine_icon_21.png',
						title: '我的咨询',
						url: ''
					},
					{
						icon: '/mine/mine_icon_22.png',
						title: '作品',
						url: ''
					},
					{
						icon: '/mine/mine_icon_23.png',
						title: '收藏',
						url: ''
					},
					{
						icon: '/mine/mine_icon_27.png',
						title: '设备中心',
						url: ''
					}
				],
				[
					{
						icon: '/mine/mine_icon_24.png',
						title: '客服',
						url: '',
						value: '/mine/woman_01.png'
					},
					{
						icon: '/mine/mine_icon_25.png',
						title: '设置',
						url: '/subpackage/mine/setting/index'
					}
				]
			],
			guideShow: false
		};
	},
	onLoad() {
		//判断是否需要引导
		uni.getStorage({
			key: 'guideMine',
			success: () => {
				this.guideShow = false;
			},
			fail: () => {
				this.guideShow = true;
			}
		});
	},
	methods: {
		// 跳转页面
		navigateTo(url) {
			console.log(url);
			this.$tab.navigateTo(url);
		},
		// 隐藏漫游式引导
		toggleGuide() {
			uni.setStorage({
				key: 'guideMine',
				data: 'hasShow',
				success: () => {
					this.guideShow = false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.page-mine {
	position: relative;
	padding-top: calc(140rpx + env(safe-area-inset-top));
	padding-bottom: 100rpx;
	background-color: #f7f7f7;
	min-height: 100vh;
	z-index: 0;

	.background {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.user-content {
		margin: 0 32rpx;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}

	.user-avatar {
		width: 96rpx;
		height: 96rpx;
	}

	.user-name {
		font-size: 36rpx;
		font-weight: bolder;
		color: #242426;
	}

	.account-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 48rpx 32rpx 0 32rpx;
		padding: 0 24rpx;
	}

	.account-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 25%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.account-value {
		line-height: 56rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: bold;
		color: #242426;
	}

	.account-label {
		line-height: 37rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #242426;
	}

	.svip-content {
		margin: 32rpx 32rpx 0 32rpx;
	}

	.svip-image {
		display: block;
		width: 686rpx;
		height: 122rpx;
	}

	.menu-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 690rpx;
		padding: 32rpx 0;
		margin: 32rpx auto 0 auto;
		border-radius: 24rpx;
		background-color: #fff;
	}

	.menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
	}

	.menu-label {
		margin-top: 17rpx;
		font-size: 28rpx;
		color: #242426;
	}

	.menu-value {
		margin-top: 8rpx;
		height: 28rpx;
		font-size: 20rpx;
		color: #979799;
	}

	/deep/ .u-swiper {
		margin: 24rpx 32rpx;
	}

	/deep/ .u-swiper__indicator {
		bottom: 13rpx !important;
	}

	.indicator {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.indicator-line {
		width: 24rpx;
		height: 6rpx;
		margin: 0 8rpx;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 294rpx;
	}

	.indicator-line.active {
		background-color: #5e89ff;
	}

	.list {
		margin: 0 32rpx 32rpx 32rpx;
		border-radius: 24rpx;
		background-color: #ffffff;
	}

	.list-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 112rpx;
		padding: 0 32rpx;
		&::after {
			position: absolute;
			bottom: 0;
			right: 32rpx;
			content: '';
			width: 582rpx;
			height: 2rpx;
			background-color: #f7f7f7;
		}
		&:last-child::after {
			display: none;
		}
	}

	.list-left,
	.list-right {
		display: flex;
		align-items: center;
	}

	.left-icon {
		width: 48rpx;
		height: 48rpx;
		margin-right: 24rpx;
	}

	.list-title {
		font-size: 32rpx;
		color: #242426;
	}

	.right-icon {
		width: 64rpx;
		height: 64rpx;
		margin-right: 8rpx;
	}

	.right-arrow {
		width: 32rpx;
		height: 32rpx;
	}

	.right-text {
		font-size: 28rpx;
		color: #636366;
	}

	.guide-content {
		position: fixed;
		width: 100%;
		top: 0;
	}
}

.discroll {
	height: 100vh;
	overflow: hidden;
}
</style>
