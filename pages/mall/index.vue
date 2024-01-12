<template>
	<view class="page-mall">
		<!-- 背景 -->
		<image class="background" :src="cdnUrl + '/mall/image_bg.png'"></image>

		<!-- 顶部搜索栏 -->
		<u-sticky :bgColor="navbarBgColor">
			<u-navbar :fixed="false" bgColor="transparent">
				<view class="navbar-title" slot="left">健康商城</view>
				<view class="search-container" slot="center" @click="navigateTo('/subPackages/mall/search/index')">
					<image class="search-icon" :src="cdnUrl + '/mall/icon_02.png'"></image>
					<text>搜索你想要的宝贝</text>
				</view>
			</u-navbar>
		</u-sticky>

		<!-- 轮播图 -->
		<u-swiper
			:list="banner"
			:current="bannerIndex"
			:interval="5000"
			:duration="500"
			:circular="true"
			keyName="imgUrl"
			height="258rpx"
			radius="24rpx"
			@change="(e) => (bannerIndex = e.current)"
		>
			<view slot="indicator" class="indicator">
				<view class="indicator-line" v-for="(item, index) in banner" :key="index" :class="[index === bannerIndex && 'active']"></view>
			</view>
		</u-swiper>

		<!-- 商品分类 -->
		<u-sticky offsetTop="184rpx">
			<view class="category-container" :class="[categoryFixed && 'fixed']">
				<!-- 一级商品分类 -->
				<view class="category-list">
					<view class="category-item" v-for="item in categories" :key="item.id" @click="onCategoryChange(item)">
						<view class="category-name" v-if="pid === item.id">{{ item.cate_name }}</view>
						<image :src="item.pic" class="category-image" mode="aspectFill" v-else></image>
					</view>
				</view>
				<!-- 二级商品分类 -->
				<u-tabs
					:list="tabs"
					:current="tabIndex"
					keyName="cate_name"
					lineWidth="32rpx"
					lineHeight="8rpx"
					lineColor="#FE3838"
					activeStyle="color:#242526;font-weight:bold;font-size:38rpx;"
					inactiveStyle="color: #636366;font-size: 32rpx;"
					itemStyle="height:100rpx;padding:0 25rpx;"
					@click="onCategoryChange"
				></u-tabs>
			</view>
		</u-sticky>

		<!-- 商品列表 -->
		<product-list :list="products" radius="12rpx" emptyText="暂无相关商品"></product-list>
	</view>
</template>

<script>
import config from '@/config';
export default {
	data() {
		return {
			cdnUrl: config.cdnUrl,
			navbarBgColor: 'transparent', // 顶部搜索栏的背景色
			categoryFixed: false, // 商品分类固定定位
			bannerIndex: 0, // 当前轮播图的index
			banner: [], // 轮播图
			categories: [], // 一级商品分类
			tabIndex: 0, // 当前二级商品分类的index
			tabs: [], // 二级商品分类
			products: [], // 商品列表
			pid: '', // 一级商品分类id
			categoryId: '', // 当前商品分类id
			page: 1, // 页码
			hasMore: false // 加载更多
		};
	},
	onLoad() {
		// 获取轮播图
		this.getLanternBanner('banner', 25);
		// 获取商品分类
		this.getProductCategories('categories', { limit: 9 });
	},
	onReachBottom() {
		console.log(111);
		if (this.hasMore) {
			this.page++;
			this.getProductsByCategoryId(this.categoryId);
		}
	},
	onPageScroll(e) {
		if (e.scrollTop >= 50) {
			this.navbarBgColor = '#f7f7f7';
		} else {
			this.navbarBgColor = 'transparent';
		}
		if (e.scrollTop >= 200) {
			this.categoryFixed = true;
		} else {
			this.categoryFixed = false;
		}
	},
	methods: {
		// 商品分类切换
		onCategoryChange(item) {
			if (!item) {
				this.navigateTo('/subPackages/mall/category/index');
				return;
			}
			this.page = 1;
			if (!item.pid) {
				this.tabIndex = 0;
				this.pid = item.id;
				this.getProductCategories('tabs', { page: 0, pid: item.id });
			} else {
				this.tabIndex = item.index;
				this.getProductsByCategoryId(item.id);
			}
		},
		// 跳转页面
		navigateTo(url) {
			this.$tab.navigateTo(url);
		},
		getLanternBanner(field, type) {
			this.$store
				.dispatch('GetLanternBanner', {
					type
				})
				.then((res) => {
					this[field] = res;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getProductCategories(field, params) {
			this.$store
				.dispatch('GetProductCategories', params)
				.then((res) => {
					if (!params.pid) {
						res.push({
							cate_name: '全部',
							pic: `${this.cdnUrl}/mall/option_icon_10.png`
						});
						this.pid = res[0].id;
						this.getProductCategories('tabs', { page: 0, pid: res[0].id });
					}
					this[field] = res;
					if (res.length > 0) {
						this.categoryId = res[0].id;
						this.getProductsByCategoryId(res[0].id);
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getProductsByCategoryId(cate_id) {
			this.$store
				.dispatch('GetProductsByCategoryId', {
					cate_id,
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
.page-mall {
	min-height: 100vh;
	background-color: #f7f7f7;
	.background {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
	}
	/deep/ .u-navbar {
		height: 184rpx;
	}

	/deep/ .u-navbar__content__left {
		padding: 0 20rpx 0 30rpx;
	}

	.navbar-title {
		line-height: 56rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #303233;
	}

	.search-container {
		display: flex;
		align-items: center;
		gap: 15rpx;
		width: 324rpx;
		height: 64rpx;
		border-radius: 32rpx;
		padding: 0 26rpx 0 20rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #979799;
	}
	/*  #ifdef  APP-PLUS  */
	.search-container {
		margin-left: 180rpx;
		width: calc(100vw - 240rpx);
	}
	/*  #endif  */

	.search-icon {
		width: 40rpx;
		height: 40rpx;
	}

	/deep/ .u-swiper {
		padding: 0 30rpx;
		margin: 30rpx 0;
	}

	/deep/ .u-swiper__indicator {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 40rpx;
		bottom: 0;
	}

	.indicator {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.indicator-line {
		width: 30rpx;
		height: 6rpx;
		background-color: rgba(255, 255, 255, 0.8);
		&:first-child {
			border-radius: 4rpx 0 0 4rpx;
		}
		&:last-child {
			border-radius: 0 4rpx 4rpx 0;
		}
	}

	.indicator-line.active {
		border-radius: 4rpx;
		background-color: #fe3838;
	}

	.category-container {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
	}

	.category-container.fixed {
		background: #f7f7f7;

		/deep/ .u-tabs {
			background: #fff;
		}
	}

	/deep/ .u-tabs {
		padding-left: 5rpx;
	}

	/deep/ .u-tabs__wrapper__nav__line {
		bottom: 12rpx;
		border-radius: 4rpx;
	}

	.category-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 30rpx;
	}

	.category-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 112rpx;
		height: 112rpx;
		margin-right: 16rpx;
		margin-bottom: 8rpx;
		&:nth-child(5n) {
			margin-right: 0;
		}
	}

	.category-name {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		border: 1px solid #fe3838;
		background-color: #fff2f0;
		font-size: 28rpx;
		font-weight: bold;
		color: #fe3838;
	}

	.category-image {
		width: 112rpx;
		height: 112rpx;
		border-radius: 50%;
	}
}
</style>
