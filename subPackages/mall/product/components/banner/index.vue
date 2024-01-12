<template>
	<view class="component-banner">
		<!-- 轮播图 -->
		<u-swiper :list="banner" :duration="400" :autoplay="false" height="750rpx" radius="0" @change="(e) => (current = e.current)">
			<view slot="indicator" class="indicator">
				<view class="indicator-dot" v-for="(item, index) in banner" :key="index" :class="[index === current && 'active']"></view>
			</view>
		</u-swiper>

		<!-- 弹幕 -->
		<view class="barrage-list">
			<view class="barrage-item" v-for="(item, index) in barrages" :key="index" :style="'top: ' + item.top + 'rpx;'">
				<image :src="item.avatar" class="barrage-avatar"></image>
				<view class="barrage-comment">{{ item.comment }}</view>
			</view>
		</view>

		<!-- 套餐商品 -->
		<image :src="cdnUrl + '/order/pic_01.png'" class="package-image" v-if="packageShow"></image>
	</view>
</template>

<script>
import config from '@/config';
export default {
	name: 'banner',
	props: {
		banner: Array, // 轮播图
		barrages: Array, // 弹幕
		packageShow: Boolean //套餐商品是否展示
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl: config.cdnUrl,
			current: 0 // 当前轮播图的index
		};
	}
};
</script>

<style lang="scss" scoped>
.component-banner {
	position: relative;

	/deep/ .u-swiper__indicator {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 60rpx;
		bottom: 0;
	}

	.indicator {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16rpx;
	}

	.indicator-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.indicator-dot.active {
		background-color: #000;
	}

	.barrage-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: absolute;
		right: -800rpx;
		top: 0;
		height: 56rpx;
		padding: 4rpx 16rpx 4rpx 4rpx;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 44rpx;
		transform: translateX(0);
		animation: barrageAnimate linear 8s 0s infinite;
	}

	.barrage-avatar {
		width: 48rpx;
		height: 48rpx;
		margin-right: 8rpx;
		border-radius: 50%;
	}

	.barrage-comment {
		max-width: 600rpx;
		font-size: 24rpx;
		color: #fff;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.barrage-item:nth-child(2n) {
		animation: barrageAnimate linear 8s 4s infinite;
	}

	.barrage-item:nth-child(3n) {
		animation: barrageAnimate linear 8s 6s infinite;
	}

	.barrage-item:nth-child(5n) {
		animation: barrageAnimate linear 8s 8s infinite;
	}

	.barrage-item:nth-child(7n) {
		animation: barrageAnimate linear 8s 10s infinite;
	}

	.package-image {
		position: absolute;
		width: 96rpx;
		height: 88rpx;
		right: 0;
		top: 0;
		z-index: 3;
	}

	@keyframes barrageAnimate {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-1700rpx);
		}
	}
}
</style>
