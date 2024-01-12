<template>
	<view class="page-launch">
		<!-- 倒计时 -->
		<view class="timer" v-if="seconds >= 0">
			<view class="countdown">{{ seconds }}s</view>
			<view class="skip-button" @click="skip">跳过</view>
		</view>

		<!-- 活动banner -->
		<image :src="banner.imgUrl" class="activity-banner" @click="navigateTo(banner.pageJumpPatch)"></image>

		<!-- footer -->
		<view class="footer">
			<image class="logo" :src="cdnUrl + '/launch/nyk_logo.png'" mode="heightFix"></image>
			<text class="copyright">Copyright © 脑悦康版权所有</text>
		</view>
	</view>
</template>

<script>
import config from '@/config';
export default {
	data() {
		return {
			cdnUrl: config.cdnUrl,
			seconds: 3, // 倒计时
			banner: '' // 活动海报
		};
	},
	onLoad() {
		this.getActivityBanner();
	},
	methods: {
		//倒计时
		countdown() {
			if (this.seconds > 0) {
				this.seconds--;
				setTimeout(() => {
					this.countdown();
				}, 1000);
			} else {
				this.seconds = 3;
				this.$tab.switchTab('/pages/home/index');
			}
		},
		// 跳过
		skip() {
			this.$tab.switchTab('/pages/home/index');
		},
		// 跳转活动页
		navigateTo(url) {
			this.$tab.navigateTo(url);
		},
		// 获取活动banner
		getActivityBanner() {
			this.$store
				.dispatch('GetLanternBanner', {
					type: 26
				})
				.then((res) => {
					this.banner = res[0];
					this.countdown();
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-launch {
	position: relative;
	height: 100vh;

	.timer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: 166rpx;
		left: 30rpx;
		width: 120rpx;
		height: 50rpx;
		border-radius: 26rpx;
		border: 2rpx solid #fff;
		background-color: rgba(0, 0, 0, 0.3);
		font-size: 24rpx;
		color: #fff;
		text-align: center;
		z-index: 9;
	}

	.countdown {
		width: 50rpx;

		&::after {
			position: absolute;
			left: 50rpx;
			top: 0;
			bottom: 0;
			margin: auto;
			content: '';
			width: 2rpx;
			height: 30rpx;
			background-color: #fff;
		}
	}

	.skip-button {
		width: 70rpx;
	}

	.activity-banner {
		width: 100vw;
		height: calc(100vh - (200rpx + env(safe-area-inset-bottom)));
	}

	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		width: 100vw;
		bottom: calc(50rpx + env(safe-area-inset-bottom));
	}

	.logo {
		width: 236rpx;
		height: 64rpx;
	}

	.copyright {
		margin-top: 20rpx;
		text-align: center;
		color: #9f9f9f;
		font-size: 22rpx;
	}
}
</style>
