<template>
	<view class="page-home">
		<!-- 顶部搜索栏 -->
		<u-navbar :fixed="false" @leftClick="navigateTo({ pageJumpPatch: '/packageF/index/search' })">
			<view class="search-container" slot="left">
				<text>搜一搜吧</text>
				<image class="search-icon" :src="cdnUrl + '/index/search_icon_01.png'"></image>
			</view>
		</u-navbar>

		<!-- 顶部导航栏 -->
		<!-- <u-skeleton v-if="tabs.length === 0" :title="false" :rowsWidth="['100%']" :rowsHeight="['92rpx']" rows="1"></u-skeleton> -->
		<u-tabs
			:list="tabs"
			:current="1"
			lineColor="#5E89FF"
			activeStyle="color:#242426;font-weight:bold;font-size:44rpx;"
			inactiveStyle="color: #636366;font-size: 32rpx;"
			itemStyle="height:92rpx;padding:0 20rpx;"
			@click="navigateTo"
		></u-tabs>

		<!-- 轮播图 -->
		<u-swiper :list="banner" :duration="500" :circular="true" keyName="imgUrl" height="422rpx" radius="0" @click="navigateTo"></u-swiper>

		<!-- 菜单 -->
		<u-scroll-list indicatorWidth="80rpx" indicatorBarWidth="32rpx" indicatorColor="#eee" indicatorActiveColor="#5E89FF">
			<view class="menu-container">
				<view class="menu-list" v-for="(menu, index) in menus" :key="index">
					<view class="menu-item" v-for="item in menu" :key="item.id">
						<image class="menu-icon" :src="item.icon" mode="aspectFill"></image>
						<text class="menu-name">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</u-scroll-list>

		<!-- banner -->
		<view class="banner-container">
			<image :src="cdnUrl + '/index/bg_19.png'" class="banner-image" mode="widthFix"></image>
			<image :src="cdnUrl + '/index/bg_20.png'" class="banner-image" v-if="appStatus == '1'" mode="widthFix"></image>
			<image :src="cdnUrl + '/index/bg_21.png'" class="banner-image" v-else mode="widthFix"></image>
		</view>

		<!-- 精选对话 -->
		<view class="video-container" v-if="video">
			<view class="title">精选对话</view>
			<view class="video-content">
				<image :src="video.coverUrl" class="video-cover"></image>
				<image :src="cdnUrl + '/home/play.png'" mode="aspectFill" class="play-button" v-if="video.contentTypeId == '0'"></image>
			</view>
			<view class="video-title">{{ video.title }}</view>
		</view>

		<!-- 间隔槽 -->
		<u-gap height="16rpx" bgColor="#f7f7f7"></u-gap>

		<!-- 文章分类 -->
		<view class="category-container">
			<u-tabs
				:list="categories"
				lineColor="#fff"
				activeStyle="color:#242426;font-weight:bold;font-size:44rpx;"
				inactiveStyle="color: #636366;font-size: 30rpx;"
				itemStyle="height:60rpx;padding:0 24rpx;align-items:flex-end;"
				@click="onCategoryChange"
			></u-tabs>
		</view>

		<!-- 文章列表 -->
		<u-list>
			<u-list-item v-for="item in articles" :key="item.id">
				<u-cell :title="item.title" :label="item.createTime" :border="false" v-if="item.contentTypeId == '1'">
					<u--image :src="item.coverUrl" mode="aspectFill" slot="value" width="212rpx" height="160rpx" radius="8rpx"></u--image>
				</u-cell>
				<view class="article-item" v-else>
					<view class="article-title">{{ item.title }}</view>
					<view class="video-content">
						<image :src="item.coverUrl" class="video-cover" mode="aspectFill"></image>
						<image :src="cdnUrl + '/home/play.png'" class="play-button"></image>
					</view>
					<view class="article-date">{{ item.createTime }}</view>
				</view>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
import config from '@/config';
import { chunk } from 'lodash';
export default {
	data() {
		return {
			cdnUrl: config.cdnUrl,
			appStatus: this.$store.state.system.appStatus,
			tabs: [], // 顶部导航栏
			banner: [], // 轮播图
			menus: [], // 菜单
			video: null, // 精选对话
			categories: [], // 文章分类
			articles: [], // 文章列表
			categoryId: '', // 当前文章分类id
			page: 1, // 文章页码
			hasMore: false // 加载更多
		};
	},
	onLoad() {
		// 获取顶部导航栏
		this.getLanternBanner('tabs', 16);
		// 获取轮播图
		this.getLanternBanner('banner', 12);
		// 获取菜单
		this.getHotList();
		// 获取精选对话
		this.getSectionList(this.getArticlesBySectionId, 6);
		// 获取文章分类
		this.getSectionList(this.getCategoryListBySectionId, 7);
	},
	onReachBottom() {
		if (this.hasMore) {
			this.page++;
			this.getCategoryListByCategoryId(this.categoryId);
		}
	},
	methods: {
		// 跳转页面
		navigateTo(item) {
			console.log(item);
			if (item.index && item.index > 0) {
				this.$tab.switchTab(item.pageJumpPatch);
			} else {
				this.$tab.navigateTo(item.pageJumpPatch || this.banner[item].pageJumpPatch);
			}
		},
		// 文章分类切换
		onCategoryChange(item) {
			this.page = 1;
			this.categoryId = item.id;
			this.getCategoryListByCategoryId(item.id);
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
		getHotList() {
			this.$store
				.dispatch('GetHotList')
				.then((res) => {
					this.menus = chunk(res, 2);
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getSectionList(fn, sourceType) {
			this.$store
				.dispatch('GetSectionList', {
					sourceType
				})
				.then((res) => {
					fn(res[0].id);
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getArticlesBySectionId(sectionId) {
			this.$store
				.dispatch('GetArticlesBySectionId', {
					sectionId,
					page: 1,
					size: 1
				})
				.then((res) => {
					this.video = res[0] || null;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getCategoryListBySectionId(sectionId) {
			this.$store
				.dispatch('GetCategoryListBySectionId', {
					sectionId
				})
				.then((res) => {
					this.categories = res;
					this.categoryId = res[0].id;
					this.getCategoryListByCategoryId(res[0].id);
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getCategoryListByCategoryId(categoryId) {
			uni.showLoading();
			this.$store
				.dispatch('GetCategoryListByCategoryId', {
					categoryId,
					page: this.page,
					size: 10
				})
				.then((res) => {
					uni.hideLoading();
					if (this.page === 1) {
						this.articles = res;
					} else {
						this.articles = this.articles.concat(res);
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
.page-home {
	/deep/ .u-navbar {
		height: 184rpx;
	}
	.search-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 474rpx;
		height: 64rpx;
		border-radius: 252rpx;
		padding: 0 24rpx;
		margin-left: 4rpx;
		background-color: rgba(238, 238, 238, 0.8);
		font-size: 26rpx;
		color: #979799;
	}

	.search-icon {
		width: 40rpx;
		height: 40rpx;
	}

	/deep/ .u-tabs {
		height: 105rpx;
		padding: 0 32rpx 0 12rpx;
	}

	/deep/ .u-tabs__wrapper__nav__line {
		bottom: 0;
	}

	/deep/ .u-swiper {
		margin-top: 10rpx;
	}

	/deep/ .u-scroll-list {
		position: relative;
		margin: -60rpx 32rpx 0 32rpx;
		padding-bottom: 16rpx;
		border-radius: 24rpx;
		background-color: #fff;
		box-shadow: 0 6rpx 24rpx 0 rgba(0, 0, 0, 0.05);
		overflow: hidden;
		z-index: 2;
	}

	/deep/ .u-scroll-list__indicator {
		margin-top: 0;
	}

	/deep/ .u-scroll-list__indicator__line {
		height: 6rpx;
		border-radius: 212rpx;
	}
	
	/deep/ .u-scroll-list__indicator__line__bar {
		border-radius: 212rpx;
	}

	.menu-container {
		display: flex;
		height: 420rpx;
	}

	.menu-list {
		display: flex;
		flex-direction: column;
	}

	.menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 170rpx;
		margin-top: 16rpx;
		padding: 16rpx 0;
	}

	.menu-icon {
		width: 112rpx;
		height: 112rpx;
	}

	.menu-name {
		color: #636366;
		font-size: 28rpx;
	}

	.banner-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 40rpx 32rpx 0 32rpx;
	}

	.banner-image {
		display: block;
		width: 334rpx;
		border-radius: 20rpx;
	}

	.video-container {
		margin: 0 32rpx;

		.title {
			margin-top: 40rpx;
			margin-bottom: 32rpx;
			font-size: 44rpx;
			font-weight: bold;
			color: #242426;
		}
	}

	.video-content {
		position: relative;
	}

	.video-cover {
		display: block;
		width: 100%;
		height: 214rpx;
		border-radius: 24rpx 24rpx 0 0;
		margin-bottom: 32rpx;
	}

	.play-button {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		right: 0;
		top: 0;
		left: 0;
		bottom: 0;
		margin: auto;
	}

	.video-title {
		margin-bottom: 48rpx;
		font-size: 36rpx;
		color: #242426;
	}

	.category-container /deep/ .u-tabs {
		height: auto;
		padding: 0 32rpx 0 8rpx;
		margin-top: 40rpx;
	}

	/deep/ .u-cell {
		margin: 32rpx 32rpx 0 32rpx;
	}

	/deep/ .u-cell__body {
		padding: 0 0 32rpx 0;
		justify-content: space-between;
		border-bottom: 2rpx solid #eee;
	}

	/deep/ .u-cell__body__content {
		flex: none;
		width: calc(100% - 238rpx);
	}

	/deep/ .u-cell__title-text {
		line-height: 52rpx;
		font-size: 36rpx;
		color: #242426;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	/deep/ .u-cell__label {
		line-height: normal;
		margin-top: 24rpx;
		font-size: 24rpx;
		color: #979799;
	}

	.article-item {
		margin: 32rpx 32rpx 0 32rpx;
		border-bottom: 2rpx solid #eee;
	}

	.article-title {
		margin-bottom: 16rpx;
		font-size: 36rpx;
		color: #242426;
	}

	.article-date {
		margin-bottom: 32rpx;
		color: #979799;
		font-size: 24rpx;
	}
}
</style>
