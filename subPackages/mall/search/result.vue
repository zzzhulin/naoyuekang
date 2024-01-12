<template>
	<view class="page-search-result">
		<!-- 顶部搜索栏 -->
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" :autoBack="true" bgColor="#f5f5f5">
			<image :src="cdnUrl + '/mine/left-b.png'" slot="left" class="back-icon"></image>
			<view class="search-container" slot="center">
				<view class="search-input">
					<input v-model="keyword" class="input" placeholder="睿健" @confirm="search" />
					<image :src="cdnUrl + '/mall/close_icon_01.png'" v-if="keyword !== ''" class="clear-button" @click="clear"></image>
				</view>
				<view class="search-button" @click="search">搜索</view>
			</view>
		</u-navbar>

		<!-- 商品列表 -->
		<product-list :list="products" from="search" radius="24rpx" emptyText="还没有相关商品哦~"></product-list>
	</view>
</template>

<script>
import config from '@/config';
import { parseString } from '@/utils/common';
export default {
	data() {
		return {
			cdnUrl: config.cdnUrl,
			keyword: '', // 搜索关键字
			products: [], // 商品列表
			page: 1, // 页码
			hasMore: false // 加载更多
		};
	},
	onLoad(option) {
		this.keyword = parseString(option.keyword);
		this.getProductList();
	},
	onReachBottom() {
		if (this.hasMore) {
			this.page++;
			this.getProductList();
		}
	},
	methods: {
		// 清空输入框的值
		clear() {
			this.keyword = '';
			this.getProductList();
		},
		// 搜索
		search() {
			this.page = 1;
			this.getProductList();
		},
		getProductList() {
			this.$store
				.dispatch('GetProductList', {
					key: this.keyword || '睿健',
					page: this.page,
					limit: 10
				})
				.then((res) => {
					if (this.page === 1) {
						this.products = res;
					} else {
						this.products = this.products.concat(res);
					}
					this.hasMore = res.length >= 10;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-search-result {
	min-height: 100vh;
	background-color: #f5f5f5;

	/deep/ .u-navbar__content__left {
		padding: 0;
	}

	/deep/ .u-navbar__content {
		justify-content: left;
	}

	/deep/ .u-navbar__content__left {
		width: 80rpx;
		padding: 0 0 0 30rpx;
	}

	.back-icon {
		width: 20rpx;
		height: 34rpx;
	}

	.search-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: calc(100vw - 296rpx);
		margin-left: 80rpx;
		height: 64rpx;
		padding: 0 20rpx;
		border-radius: 32rpx;
		background-color: #fff;
	}

	/*  #ifdef  APP-PLUS  */
	.search-container {
		width: calc(100vw - 110rpx);
	}
	/*  #endif  */

	.search-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
	}

	.input {
		flex: 1;
		line-height: 30rpx;
		font-size: 28rpx;
		color: #303033;
	}

	.clear-button {
		width: 36rpx;
		height: 36rpx;
		margin: 0 20rpx;
	}

	.search-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90rpx;
		height: 50rpx;
		background-color: #5e89ff;
		border-radius: 32rpx;
		font-size: 26rpx;
		color: #ffffff;
	}

	/deep/ .product-list {
		padding: 0 20rpx;
		margin-top: 32rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	/deep/ .empty-text {
		margin-top: 82rpx;
		color: #a6abad;
	}
}
</style>
