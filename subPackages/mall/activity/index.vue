<template>
	<view class="page-activity" :style="'background-color:' + activityInfo.bg_color">
		<!-- 顶部导航栏 -->
		<u-navbar :autoBack="true" :bgColor="navbarBgColor" :titleStyle="titleStyle" title="每日福利">
			<view class="back-button" slot="left">
				<image :src="backUrl" class="back-icon"></image>
			</view>
		</u-navbar>

		<!-- 抽奖背景图 -->
		<image :src="activityInfo.activity_config.background" class="background" mode="widthFix" v-if="activityInfo.activity_config.background"></image>

		<!-- 抽奖规则 -->
		<view class="rule-button" @click="openPopup('rule')">规则</view>

		<!-- 抽奖大转盘 -->
		<view class="wheel-content">
			<image :src="cdnUrl + '/activity/dailyBenefits_bg_03.png'" class="wheel-background"></image>
			<image :src="activityInfo.activity_config.turntable" class="wheel-gift"></image>
			<auth-button @click="start">
				<image :src="activityInfo.activity_config.pointer" class="wheel-button"></image>
			</auth-button>
		</view>

		<!-- 抽奖按钮 -->
		<view class="button-content">
			<view class="activity-button">抽奖次数 {{ totalNum }}</view>
			<view class="share-button" @click="share">分享活动</view>
		</view>

		<!-- 抽奖说明 -->
		<view class="activity-description">
			<text>获取抽奖机会的方式:</text>
			<text>{{ activityInfo.activity_config.remarks }}</text>
		</view>

		<!-- 秒杀 -->
		<seckill :list="activityInfo.seckill_list"></seckill>

		<!-- 抽奖规则弹窗 -->
		<rule :rule="activityInfo.activity_config.rule" ref="rule"></rule>

		<!-- 分享弹窗 -->
		<popup-share ref="share" :poster="activityInfo.share_pic"></popup-share>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
import rule from './components/rule';
import seckill from './components/seckill';
import popupShare from './components/popup-share';
import { concat } from 'lodash';
export default {
	components: {
		rule,
		seckill,
		popupShare
	},
	data() {
		return {
			cdnUrl,
			backUrl: cdnUrl + '/mine/left-w.png', // 返回按钮
			navbarBgColor: 'transparent', // 顶部导航栏的背景色
			titleStyle: {
				color: 'transparent' // 标题字体颜色
			},
			inviteCode: this.$store.state.user.inviteCode,
			totalNum: 0, //抽奖次数
			activityInfo: {
				bg_color: '',
				share_pic: '',
				seckill_list: [],
				activity_config: {
					awards_num: 0,
					background: '',
					turntable: '',
					pointer: '',
					remarks: '',
					rule: ''
				}
			}
		};
	},
	onLoad(option) {
		// 获取活动详情
		this.getActivitySetting(option);
	},
	onPageScroll(e) {
		if (e.scrollTop >= 50) {
			this.backUrl = cdnUrl + '/mine/left-b.png';
			this.navbarBgColor = '#fff';
			this.titleStyle.color = '#000';
		} else {
			this.backUrl = cdnUrl + '/mine/left-w.png';
			this.navbarBgColor = 'transparent';
			this.titleStyle.color = 'transparent';
		}
	},
	methods: {
		// 抽奖
		start() {},
		// 分享活动
		share() {
			uni.showLoading({
				title: '图片生成中',
				mask: true
			});
			let scene = `&tag=Everyday_activity`;
			if (this.inviteCode) {
				scene = concat([`r_c=${this.inviteCode}`], [scene]);
			}
			this.$store
				.dispatch('GetNovemberActivityV4_1', {
					basePicUrl: this.activityInfo.share_pic,
					scene,
					url: '/subPackages/mall/activity/index'
				})
				.then((res) => {
					uni.hideLoading();
					if (res) {
						this.poster = res;
						this.$refs.share.open();
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		// 打开弹窗
		openPopup(ref) {
			this.$refs[ref].open();
		},
		getActivitySetting(params) {
			this.$store
				.dispatch('GetActivitySetting', params)
				.then((res) => {
					if (res) {
						this.activityInfo = res;
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	},
	onShareAppMessage() {
		const sourceTime = new Date().getTime();
		const path = `/subPackages/mall/activity/index?tag=Everyday_activity&r_c=${this.inviteCode}&sourceTime=${sourceTime}`;
		return {
			title: '每日福利',
			path,
			imageUrl: this.activityInfo.share_pic
		};
	},
	onShareTimeline() {
		const sourceTime = new Date().getTime();
		const path = `/subPackages/mall/activity/index?tag=Everyday_activity&r_c=${this.inviteCode}&sourceTime=${sourceTime}`;
		return {
			title: '每日福利',
			path,
			imageUrl: this.activityInfo.share_pic
		};
	}
};
</script>

<style lang="scss" scoped>
.page-activity {
	display: flex;
	flex-direction: column;
	position: relative;
	min-height: 100vh;
	overflow: hidden;
	padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
	z-index: 1;

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
	}

	.background {
		position: absolute;
		top: 0;
		display: block;
		width: 100%;
		min-height: 1200rpx;
		z-index: -1;
	}

	.rule-button {
		display: flex;
		align-items: center;
		justify-content: center;
		align-self: flex-end;
		margin: 290rpx 32rpx 0 0;
		width: 92rpx;
		height: 92rpx;
		border-radius: 50%;
		border: 2rpx solid #ffd79a;
		font-size: 32rpx;
		text-align: center;
		color: #ffd79a;
		z-index: 2;
	}

	.wheel-content {
		position: relative;
		height: 640rpx;
		margin-top: 48rpx;
	}

	.wheel-background,
	.wheel-gift,
	.wheel-button {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.wheel-background {
		width: 640rpx;
		height: 640rpx;
	}

	.wheel-gift {
		width: 540rpx;
		height: 540rpx;
		transform: rotate(0deg);
	}

	.wheel-button {
		width: 210rpx;
		height: 210rpx;
	}

	.button-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 80rpx;
		margin-top: 50rpx;
	}

	.activity-button,
	.share-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 280rpx;
		height: 80rpx;
		border-radius: 628rpx;
		background: linear-gradient(180deg, #fe3838 0%, #fd8b5b 100%);
		border: 2rpx solid #fdd3a8;
		font-size: 32rpx;
		font-weight: bolder;
		color: #ffd79a;
	}

	.share-button {
		color: #fff;
	}

	.activity-description {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		margin: 20rpx auto;
		font-size: 22rpx;
		color: #ffd79a;
	}
}
</style>
