<template>
	<u-popup :show="show" :closeOnClickOverlay="false" duration="0" overlayOpacity="0.6" round="30rpx" bgColor="#F7F7F7" @close="close" @open="open">
		<view class="popup-coupon">
			<view class="title">优惠</view>
			<view class="coupon-list">
				<view class="coupon-item" v-for="item in list" :key="item.id">
					<view class="coupon-value" v-if="item.coupon_type !== 2">{{ item.coupon_price | price }}</view>
					<view class="coupon-value discount" v-else>{{ parseFloat(item.coupon_discount * 10).toFixed(2) | price }}</view>
					<view class="coupon-info">
						<text class="coupon-title">{{ item.title }}</text>
						<text class="coupon-date">{{ item.end_time }}到期</text>
					</view>
					<view class="button" v-if="!item.is_use && item.tag">去填问卷</view>
					<view class="button" :class="[item.is_use && 'used']" v-if="item.is_use">已领取</view>
					<auth-button className="button" v-else>领取</auth-button>
				</view>
			</view>
			<view class="finish-button" @click="close">完成</view>
		</view>
	</u-popup>
</template>

<script>
export default {
	name: 'popup-coupon',
	props: {
		list: Array
	},
	options: {
		styleIsolation: 'shared',
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
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

<style lang="scss">
.popup-coupon {
	position: relative;
	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		font-weight: bolder;
		font-size: 34rpx;
		color: #252526;
	}

	.coupon-list {
		margin-bottom: 210rpx;
	}

	.coupon-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
		margin: 0 auto 20rpx auto;
		padding: 50rpx 30rpx 50rpx 40rpx;
		background-color: #fff;
		border-radius: 12rpx;
	}

	.coupon-value {
		max-width: 130rpx;
		font-size: 56rpx;
		font-weight: bold;
		color: #f74e3f;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		&:before {
			content: '¥';
			font-size: 30rpx;
			font-weight: normal;
		}
	}

	.coupon-value.discount {
		&:before {
			display: none;
		}
		&::after {
			content: '折';
			font-size: 30rpx;
			font-weight: normal;
		}
	}

	.coupon-info {
		display: flex;
		flex-direction: column;
		width: 300rpx;
	}

	.coupon-title {
		font-size: 34rpx;
		color: #252526;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.coupon-date {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #49494d;
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 166rpx;
		height: 62rpx;
		background: linear-gradient(180deg, #f56a54 0%, #f74e3f 100%);
		box-shadow: 0 8rpx 12rpx 0 #ffdbd9;
		border-radius: 34rpx;
		font-size: 28rpx;
		color: #fff;
	}

	.button.used {
		background: #d5d5d5;
		box-shadow: none;
	}

	.finish-button {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690rpx;
		height: 88rpx;
		margin: auto;
		background-color: #f74e3f;
		border-radius: 44rpx;
		font-size: 32rpx;
		color: #fff;
	}
}
</style>
