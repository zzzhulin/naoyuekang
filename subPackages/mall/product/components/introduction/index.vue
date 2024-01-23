<template>
	<view class="component-introduction">
		<!-- 商品价格、销量、名称、分享 -->
		<view class="content" v-if="!seckillId">
			<view class="points" v-if="points">{{ points }}</view>
			<view class="sales-price" v-else>{{ data.price | price }}</view>
			<view class="sales">销量 {{ data.sales + data.ficti }}</view>
		</view>
		<view class="content">
			<view class="product-name">
				<text>{{ data.store_name }}</text>
				<text class="tip" v-if="!seckillId && data.discount_price / data.price < 0.7">点下方立即购买查看专属优惠</text>
			</view>
			<view class="share-button" @click="share">
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="share-btn" v-if="!isLogin"></button>
				<!-- #endif -->
				<image :src="cdnUrl + '/newMall/share01.png'" class="share-icon"></image>
				<text>分享</text>
			</view>
		</view>

		<!-- 限购 -->
		<view class="content limit" v-if="countdown">
			<view class="countdown">
				<view class="label">距结束</view>
				<u-count-down :time="countdown" format="DD天HH:mm:ss"></u-count-down>
			</view>
			<view class="stock">仅剩{{ data.stock }}个</view>
		</view>
	</view>
</template>

<script>
import { cdnUrl, phpBaseUrl } from '@/config';
export default {
	name: 'introduction',
	props: {
		seckillId: String, // 折扣商品id
		inviteCode: String, // 邀请码
		appType: Number, // 分享类型
		points: Number, // 商品积分
		countdown: Number, // 限购倒计时
		data: Object // 商品信息
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl,
			phpBaseUrl,
			isLogin: this.$store.state.system.isLogin
		};
	},
	methods: {
		// 分享
		share() {
			if (this.isLogin) {
				this.$emit('share');
			} else {
				this.shareApp();
			}
		},
		shareApp() {
			const { store_name, image, id } = this.data;
			const sourceTime = new Date().getTime();
			let path = `/subPackages/mall/product/index?id=${id}&isShare=true&sourceTime=${sourceTime}`;
			if (this.seckillId) {
				path += `&s_i=${this.seckillId}`;
			}
			if (this.appType === 2) {
				path += `&inviteCode=${this.inviteCode}`;
			} else {
				path += `&r_c=${this.inviteCode}`;
			}
			console.log(path);
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 5,
				imageUrl: image,
				title: store_name,
				miniProgram: {
					id: 'gh_e407523b61eb',
					path,
					// path: `/pages/mall/productDetail?id=5227`,
					type: 0,
					// webUrl: `${phpBaseUrl}/#/pages/mall/productDetail?id=5227`
					webUrl: `${phpBaseUrl}/#${path}`
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.component-introduction {
	padding: 40rpx 30rpx;
	margin: 20rpx;
	border-radius: 24rpx;
	background: #ffffff;
	box-shadow: 0px 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.02);

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&:first-child {
			margin-bottom: 16rpx;
		}
	}

	.sales-price,
	.points {
		display: flex;
		align-items: center;
		font-size: 40rpx;
		font-weight: bold;
		color: #f75931;
	}

	.sales-price::before {
		display: block;
		content: '¥';
		font-size: 26rpx;
	}

	.sales {
		font-size: 24rpx;
		color: #909399;
	}

	.product-name {
		flex: none;
		width: 600rpx;
		line-height: 50rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #242526;
		word-break: break-all;
	}

	.share-button {
		position: relative;
		top: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 20rpx;
		line-height: 50rpx;
		font-weight: bolder;
		color: #242626;
	}

	.share-btn {
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
		padding: 0;
		opacity: 0;
		z-index: 1;
	}

	.share-icon {
		width: 64rpx;
		height: 64rpx;
	}

	.tip {
		margin-top: 16rpx;
		font-size: 26rpx;
		color: #f74e3f;
	}

	.limit {
		margin-top: 20rpx;
		padding: 10rpx 30rpx;
		background-color: #f74e3f;
		border-radius: 10rpx;
		font-size: 26rpx;
		color: #fff;
	}

	.countdown {
		display: flex;
		align-items: center;
		width: 344rpx;
		height: 54rpx;
		border: 2rpx solid #ffffff;
		border-radius: 26rpx;
		overflow: hidden;
	}

	.label {
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		background-color: #ffffff;
		text-align: center;
		color: #f74e3f;
	}
}
</style>
