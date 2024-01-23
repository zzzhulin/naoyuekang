<template>
	<u-popup :show="show" duration="0" overlayOpacity="0.6" round="10rpx" bgColor="#fff" @close="close" @open="open">
		<view class="popup-sku">
			<view class="product-content">
				<image :src="selectedValue.image || storeInfo.image" class="product-image"></image>
				<view class="product-info">
					<block v-if="seckillId">
						<view class="price-info">
							<view class="origin-price">{{ seckillInfo.ot_price | price }}</view>
							<view class="discount-tag">
								<text>{{ seckillInfo.kill_dis | price }}折后</text>
								<text class="discount-price">{{ seckillInfo.price | price }}</text>
							</view>
						</view>
						<view class="stock">库存：{{ seckillInfo.stock }}件</view>
					</block>
					<block v-else>
						<view class="origin-price">{{ selectedValue.price || storeInfo.price | price }}</view>
						<view class="stock">库存：{{ selectedValue.stock || storeInfo.stock }}件</view>
					</block>

					<view class="selected-attr" v-if="selectedValue">
						<text class="label">已选：</text>
						<text class="value">{{ selectedValue.suk }}</text>
					</view>
				</view>
			</view>
			<view class="package-content" v-if="storeInfo.sku_package === 1">
				<view class="package-title">
					<text>套餐包含商品</text>
					<text>原总价￥{{ packageTotalPrice | price }}</text>
				</view>
				<view class="package-list">
					<view class="package-item" v-for="item in storeInfo.sku_package_list" :key="item.product_id">
						<image :src="item.cover" mode="aspectFill"></image>
						<view class="product-info">
							<view class="product-name">{{ item.product_name }}</view>
							<view class="product-sku">{{ item.sku_name }}</view>
							<view class="product-price">
								<text>{{ item.price }}</text>
								<text>{{ item.num }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bonus-content" v-if="!seckillId">
				<view class="discount-price" v-if="(selectedValue.discount < 10 || storeInfo.discount < 10) && (selectedValue.discount_price > 0 || storeInfo.discount_price > 0)">
					<text>您的折扣价</text>
					<text>{{ selectedValue.discount_price || storeInfo.discount_price }}</text>
				</view>
				<view class="share-bonus" v-if="(selectedValue.discount <= 10 || storeInfo.discount <= 10) && (selectedValue.retail_pre_back > 0 || storeInfo.retail_pre_back > 0)">
					<text>分享得奖金</text>
					<text>{{ selectedValue.retail_pre_back || storeInfo.retail_pre_back }}</text>
				</view>
			</view>
			<block v-if="!seckillId">
				<view class="attr-content" v-for="item in productAttr" :key="item.attr_name">
					<view class="attr-name">{{ item.attr_name }}</view>
					<view class="attr-list">
						<view class="attr-item" :class="[value.check && 'checked']" v-for="value in attr.attr_value" :key="value.attr">
							<text @click="toggleAttr(attr, value)">{{ value.attr }}</text>
						</view>
					</view>
				</view>
			</block>
			<view class="quantity-content">
				<view class="label">购买数量</view>
				<u-number-box v-model="quantity" :min="1" :max="max" :integer="true" step="1" bgColor="#fff" inputWidth="56rpx" color="#303133" @change="change">
					<u-icon :name="cdnUrl + '/mall/minus_icon.png'" slot="minus" size="60rpx" width="60rpx" height="60rpx"></u-icon>
					<u-icon :name="cdnUrl + '/mall/plus_icon.png'" slot="plus" size="60rpx" width="60rpx" height="60rpx"></u-icon>
				</u-number-box>
			</view>
			<view class="button-content" :class="[productAttr.length > 0 && (!selectedValue.suk || selectedValue.stock == 0) && 'disabled']">
				<auth-button className="button-item plain" @click="confirm(2)">加入购物车</auth-button>
				<auth-button className="button-item" @click="confirm(1)">立即购买</auth-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	name: 'popup-sku',
	props: {
		seckillId: String, // 折扣id
		storeInfo: Object, // 商品信息
		seckillInfo: Object, // 折扣信息
		activityInfo: Object, // 活动信息
		selectedValue: Object, // 选中的规格信息
		productAttr: Array, // 商品规格列表
		cartLimit: String // 购物车可加购数量
	},
	options: {
		styleIsolation: 'shared',
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl,
			show: false,
			quantity: 1, // 购买数量
			packageTotalPrice: 0 // 套餐总价
		};
	},
	mounted() {
		this.packageTotalPrice = this.storeInfo.sku_package_list.reduce((prev, cur) => {
			parseFloat(prev.price) * prev.num + parseFloat(cur.price) * cur.num;
		}, 0);
	},
	computed: {
		max() {
			let maxNum = 1;
			if (this.selectedValue.stock) {
				maxNum = Math.min(this.selectedValue.stock, this.cartLimit);
			} else {
				maxNum = this.cartLimit;
			}
			if (this.activityInfo) {
				const { limit_num, used_num } = this.activityInfo;
				const value = limit_num - used_num;
				if (value > 0 && value < maxNum) {
					maxNum = parseInt(value);
				}
			}
			console.log(maxNum, this.activityInfo);
			console.log(this.selectedValue.stock, this.cartLimit);
			return maxNum;
		}
	},
	methods: {
		// 切换属性
		toggleAttr(attr, value) {
			this.$emit('toggleAttr', attr, value);
		},
		// 加减购买数量
		change(e) {
			console.log(e);
			this.$emit('changeNumber', e.value);
		},
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
.popup-sku {
	padding: 10rpx 30rpx;

	.product-content {
		display: flex;
		gap: 24rpx;
		font-size: 32rpx;
		color: #606266;
	}

	.product-image {
		width: 170rpx;
		height: 170rpx;
		flex-shrink: 0;
		margin-top: -40rpx;
		border-radius: 8rpx;
	}

	.price-info {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.origin-price {
		font-size: 36rpx;
		color: #f92c1d;
		&:before {
			content: '¥';
			font-size: 26rpx;
		}
	}

	.discount-tag {
		display: flex;
		align-items: baseline;
		height: 50rpx;
		padding: 0 20rpx;
		margin-left: 10rpx;
		background-color: #f75931;
		border-radius: 24rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.discount-price {
		font-size: 34rpx;
		font-weight: bold;
		&:before {
			content: '¥';
			font-size: 26rpx;
			font-weight: normal;
			margin-left: 10rpx;
		}
	}

	.selected-attr {
		margin-top: 4rpx;
	}

	.quantity-content {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 20rpx 10rpx 10rpx 10rpx;
	}

	.quantity-content .label {
		padding: 30rpx 10rpx 10rpx 10rpx;
		font-size: 28rpx;
		color: #303133;
	}

	.quantity {
		width: 56rpx;
		margin: 0 10rpx;
		font-size: 28rpx;
		color: #606266;
		text-align: center;
	}

	.button-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 28rpx 0 20rpx 0;
	}

	.button-content.disabled .button-item {
		background-color: #ccc;
		color: #fff;
	}

	.button-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 320rpx;
		height: 80rpx;
		margin: 0 auto;
		background-color: #f74e3f;
		border-radius: 40rpx;
		font-size: 30rpx;
		color: #fff;
	}

	.button-item.plain {
		background-color: #fee7de;
		color: #f74e3f;
	}
}
</style>
