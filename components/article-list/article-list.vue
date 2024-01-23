<template>
	<view class="article-list">
		<view class="article-item" v-for="item in articleList" :key="item.id" @click="navigateTo(item)">
			<view class="article-content">
				<image
					:src="item.video_url + '?x-oss-process=video/snapshot,t_1000,m_fast,w_320?x-oss-process=image/resize,w_250,limit_0'"
					mode="widthFix"
					class="article-cover"
					v-if="item.zx_type === 2"
				></image>
				<image :src="item.cover + '?x-oss-process=image/resize,w_250,limit_0'" mode="widthFix" class="article-cover" v-else></image>
				<image :src="cdnUrl + '/home/play.png'" class="play-button" v-if="item.zx_type === 2"></image>
				<view class="article-title">
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	name: 'article-list',
	props: {
		list: Array // 文章列表
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	watch: {
		list(newValue) {
			const oddList = newValue.filter((_, index) => index % 2 === 0);
			const evenList = newValue.filter((_, index) => index % 2 !== 0);
			this.articleList = [...oddList, ...evenList];
		}
	},
	data() {
		return {
			cdnUrl,
			articleList: []
		};
	},
	methods: {
		navigateTo(item) {
			const { video_url: url, id } = item;
			if (item.zx_type === 2) {
				this.$tab.navigateTo(`/pages/academician/video?url=${url}`);
			} else {
				this.$tab.navigateTo(`/pages/article/index?id=${id}`);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.article-list {
	column-count: 2;
	column-gap: 30rpx;
}

.article-item {
	break-inside: avoid;
	padding-top: 30rpx;
}

.article-content {
	position: relative;
	z-index: 1;
	border-radius: 20rpx;
	background-color: #fff;
	overflow: hidden;
}

.article-cover {
	display: block;
	width: 100%;
	max-height: 500rpx;
	border-radius: 20rpx;
	overflow: hidden;
}

.play-button {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	width: 38rpx;
	height: 38rpx;
}

.article-title {
	padding: 20rpx;
}

.article-title text {
	font-size: 28rpx;
	font-weight: bold;
	color: #222222;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
