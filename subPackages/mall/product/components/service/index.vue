<template>
	<view class="component-service">
		<!-- 购买类型 -->
		<view class="cell-item" v-if="attr.length > 0 && seckillId" @click="click('sku')">
			<view class="cell-content">
				<text class="label">购买类型</text>
				<text class="value">{{ selectedAttr }}</text>
			</view>
			<view class="cell-link">
				<text class="num">x {{ buyNumber }}</text>
				<image :src="cdnUrl + '/mine/right-g.png'" class="arrow"></image>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="cell-item" v-if="coupons.length > 0 && !seckillId" @click="click('coupon')">
			<view class="cell-content">
				<text class="label">优惠券</text>
				<text class="value" :class="[!hasCoupon && 'disabled']">{{ hasCoupon ? '领取' + (coupons[0].coupon_price | price) + '元优惠券' : '暂无优惠券可领取' }}</text>
			</view>
			<view class="cell-link">
				<view class="tag">领券</view>
			</view>
		</view>

		<!-- 服务 -->
		<view class="cell-item">
			<view class="cell-content">
				<text class="label">服务</text>
				<text class="value">7天无理由退换货</text>
				<text class="dot">·</text>
				<text class="value">假一赔十</text>
				<text class="dot">·</text>
			</view>
		</view>
	</view>
</template>

<script>
import config from '@/config';
export default {
	name: 'service',
	props: {
		attr: Array, // 规格属性
		selectedAttr: String, // 选中规格
		buyNumber: Number, // 购买数量
		seckillId: String, // 折扣商品id
		coupons: Array // 优惠券
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	computed: {
		hasCoupon() {
			return this.coupons.some((item) => !item.is_use);
		}
	},
	data() {
		return {
			cdnUrl: config.cdnUrl
		};
	},
	methods: {
		click(ref) {
			this.$emit('click', ref);
		}
	}
};
</script>

<style lang="scss" scoped>
.component-service {
	padding: 7rpx 0;
	margin: 20rpx;
	border-radius: 24rpx;
	background: #ffffff;
	box-shadow: 0px 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.02);

	.cell-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 30rpx;
		font-size: 30rpx;
	}

	.cell-content {
		height: 42rpx;
	}

	.label {
		display: inline-block;
		width: 140rpx;
		color: #a6abad;
	}

	.value {
		color: #303133;
	}

	.disabled {
		color: #a6abad;
	}

	.dot {
		display: inline-block;
		height: 40rpx;
		line-height: 40rpx;
		margin: 0 30rpx 0 10rpx;
		font-size: 40rpx;
		color: #c4cacc;
	}

	.arrow {
		width: 15rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}

	.tag {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 74rpx;
		height: 44rpx;
		border-radius: 4rpx;
		border: 2rpx solid #f74e3f;
		font-size: 26rpx;
		color: #f74e3f;
	}
}
</style>
