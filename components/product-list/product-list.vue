<template>
	<view class="product-list" v-if="products.length > 0">
		<view class="product-item" v-for="item in products" :key="item.id" @click="navigateTo(item.id)">
			<view class="product-content" :style="{ borderRadius: radius }">
				<image :src="item.image" class="product-image" mode="widthFix"></image>
				<view class="product-name">{{ item.store_name }}</view>
				<view class="flex">
					<view class="product-price">￥{{ item.price | price }}</view>
					<view class="product-sales">已售{{ item.sales || 0 }}</view>
				</view>
			</view>
		</view>
	</view>
	<view class="empty-text" v-else>{{ emptyText }}</view>
</template>

<script>
export default {
	name: 'product-list',
	props: {
		from: String, // 页面来源
		emptyText: String, // 内容为空时的文本
		radius: String, // 商品卡片圆角
		list: Array // 商品列表
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	watch: {
		list(newValue) {
			const oddProducts = newValue.filter((_, index) => index % 2 !== 0);
			const evenProducts = newValue.filter((_, index) => index % 2 === 0);
			this.products = [...evenProducts, ...oddProducts];
		}
	},
	data() {
		return {
			products: [],
		};
	},
	methods: {
		// 跳转页面
		navigateTo(id) {
			const from = this.from || '';
			const url = `/subPackages/mall/product/index?id=${id}&from=${from}`;
			this.$tab.navigateTo(url);
		}
	}
};
</script>

<style lang="scss" scoped>
.product-list {
	column-count: 2;
	column-gap: 20rpx;
	padding: 20rpx 30rpx;
	margin-top: 10rpx;
}

.product-item {
	break-inside: avoid;
	border-radius: 12rpx;
	overflow: hidden;
}

.product-content {
	position: relative;
	z-index: 1;
	padding-bottom: 20rpx;
	margin-bottom: 20rpx;
	background-color: #fff;
	overflow: hidden;
}

.product-image {
	width: 100%;
	min-height: 300rpx;
}

.product-name {
	margin-top: 20rpx;
	margin-left: 18rpx;
	line-height: 36rpx;
	font-size: 30rpx;
	color: #242526;
	text-align: left;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: break-all;
	overflow: hidden;
}

.flex {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20rpx;
	margin-left: 18rpx;
}

.product-price {
	line-height: 52rpx;
	font-size: 36rpx;
	color: #f75931;
}

.product-sales {
	margin-right: 20rpx;
	line-height: 52rpx;
	font-size: 24rpx;
	color: #a6abad;
}

.empty-text {
	margin-top: 40rpx;
	font-size: 28rpx;
	color: #b5b5b5;
	text-align: center;
}
</style>
