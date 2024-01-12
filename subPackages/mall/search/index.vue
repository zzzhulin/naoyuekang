<template>
	<view class="page-search">
		<!-- navbar -->
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" :autoBack="true" title="搜索">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<!-- 搜索栏 -->
		<view class="search-container">
			<view class="search-input">
				<input v-model="keyword" class="input" placeholder="睿健" @confirm="navigateTo(null)" />
				<image :src="cdnUrl + '/mall/close_icon_01.png'" v-if="keyword !== ''" class="clear-button" @click="clear"></image>
			</view>
			<view class="search-button" @click="navigateTo(null)">搜索</view>
		</view>

		<!-- 热门搜索 -->
		<view class="hot-product">
			<view class="title">热门搜索</view>
			<view class="product-list">
				<view class="product-item" v-for="item in products" :key="item.id" @click="navigateTo(item)">{{ item.title }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import config from '@/config';
export default {
	data() {
		return {
			cdnUrl: config.cdnUrl,
			keyword: '', // 搜索关键字
			products: [] // 热门商品列表
		};
	},
	onLoad() {
		// 获取热门搜索
		this.getHotSearchProducts();
	},
	methods: {
		// 清空输入框的值
		clear() {
			this.keyword = '';
		},
		// 跳转页面
		navigateTo(item) {
			const keyword = item ? item.title : this.keyword;
			const url = `/subPackages/mall/search/result?keyword=${keyword}`;
			this.$tab.navigateTo(url);
		},
		getHotSearchProducts() {
			this.$store
				.dispatch('GetHotSearchProducts')
				.then((res) => {
					this.products = res;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-search {
	min-height: 100vh;
	background-color: #fff;
	padding: 0 32rpx;

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
		color: #000;
	}

	.search-input {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 536rpx;
		height: 76rpx;
		padding: 0 20rpx;
	}

	.input {
		flex: 1;
		line-height: 32rpx;
		font-size: 32rpx;
		color: #242426;
	}

	.search-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 684rpx;
		height: 88rpx;
		padding: 12rpx;
		border-radius: 44rpx;
		background-color: #f7f7f7;
	}

	.clear-button {
		width: 40rpx;
		height: 40rpx;
		margin: 0 28rpx;
	}

	.search-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 124rpx;
		height: 64rpx;
		background-color: #5e89ff;
		border-radius: 32rpx;
		font-size: 30rpx;
		color: #ffffff;
	}

	.title {
		margin: 52rpx 0 36rpx 0;
		font-size: 32rpx;
		font-weight: bold;
		color: #242426;
	}

	.product-list {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.product-item {
		margin-right: 16rpx;
		padding: 8rpx 24rpx;
		background-color: #eeeeee;
		border-radius: 28rpx;
		font-size: 30rpx;
		color: #636366;
	}
}
</style>
