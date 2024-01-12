<template>
	<view class="component-discount">
		<view class="discount-content">
			<view class="price-info">
				<view class="origin-price">{{ data.ot_price | price }}</view>
				<view class="discount-tag">
					<text>{{ data.kill_dis }}折后</text>
					<text class="discount-price">{{ data.price | price }}</text>
				</view>
			</view>
			<view class="sales">销量 {{ data.sales }}</view>
		</view>
		<image class="discount-image" :src="cdnUrl + '/newMall/discount.png'"></image>
	</view>
</template>

<script>
import config from '@/config';
export default {
	name: 'discount',
	props: {
		data: Object // 折扣信息
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl: config.cdnUrl
		};
	}
};
</script>

<style lang="scss" scoped>
.component-discount {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12rpx;
	padding: 16rpx 30rpx;
	background: linear-gradient(32deg, #f75931 0%, #ff865b 100%);

	.price-info {
		display: flex;
		align-items: center;
	}

	.origin-price {
		font-size: 40rpx;
		font-weight: bold;
		color: #fff;
		&:before {
			content: '¥';
			font-size: 30rpx;
		}
	}

	.discount-tag {
		display: flex;
		align-items: center;
		height: 50rpx;
		padding: 0 20rpx;
		margin-left: 10rpx;
		background-color: #fff;
		border-radius: 24rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #f75931;
	}

	.discount-price {
		font-size: 34rpx;
		&:before {
			content: '¥';
			font-size: 26rpx;
			margin-left: 10rpx;
		}
	}

	.sales {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.discount-image {
		width: 88rpx;
		height: 88rpx;
	}
}
</style>
