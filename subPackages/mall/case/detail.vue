<template>
	<view class="page-case-detail">
		<!-- 标题栏 -->
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :autoBack="true" title="案例详情">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<!-- 轮播图 -->
		<u-swiper :list="caseInfo.pics" :duration="400" :autoplay="false" imgMode="widthFix" height="100vh" bgColor="transparent" radius="0"></u-swiper>

		<!-- 案例详情 -->
		<view class="case-content">
			<view class="case-info">
				<view class="flex">
					<image :src="caseInfo.avatar" class="user-avatar"></image>
					<view class="user-info">
						<text class="user-name">{{ caseInfo.nickname }}</text>
						<text>{{ caseInfo.add_time }}</text>
					</view>
				</view>
				<view class="button-group flex">
					<auth-button className="share-button" @click="generatePoster">
						<u-icon :name="cdnUrl + '/familyCircle/featuredCase/poster.png'" width="40rpx" height="40rpx"></u-icon>
						<text>海报</text>
					</auth-button>
					<auth-button className="like-button" @click="like">
						<u-icon :name="cdnUrl + '/familyCircle/featuredCase/praise_icon4.png'" width="38rpx" height="40rpx" v-if="caseInfo.already_like === 1"></u-icon>
						<u-icon :name="cdnUrl + '/familyCircle/featuredCase/praise_icon3.png'" width="38rpx" height="40rpx" v-else></u-icon>
						<text>{{ caseInfo.reply_likes }}</text>
					</auth-button>
				</view>
			</view>
			<view class="case-comment" :class="[isCollapse && 'ellipse']">
				<text class="case-text">{{ caseInfo.comment }}</text>
				<view class="collapse-button" v-if="caseInfo.comment.length > 16" @click="collapse">{{ isCollapse ? '展开' : '收起' }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
import { compact } from 'lodash';
export default {
	data() {
		return {
			cdnUrl,
			isCollapse: true,
			caseInfo: {
				pics: [], // 图片
				avatar: '', // 用户头像
				nickname: '', // 用户昵称
				add_time: '', // 创建时间
				reply_likes: 0, // 点赞数
				comment: '' // 评价
			}
		};
	},
	onLoad(option) {
		this.getReplyDetail(option.id);
	},
	methods: {
		// 点赞
		like(id) {
			
		},
		// 生成海报
		generatePoster() {
			
		},
		// 展开/收起评价
		collapse() {
			this.isCollapse = !this.isCollapse;
		},
		getReplyDetail(rid) {
			this.$store
				.dispatch('GetReplyDetail', { rid })
				.then((res) => {
					if (res) {
						const { video_url, pics } = res;
						const images = !pics ? [] : pics;
						res.pics = compact([video_url, ...images]);
						this.caseInfo = res;
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	}
};
</script>

<style lang="scss">
.page-case-detail {
	height: 100vh;
	background-color: #000;
	overflow: hidden;

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

	/deep/ .u-swiper__wrapper__item__wrapper {
		align-items: center;
	}

	/deep/ .u-swiper__wrapper__item__wrapper__video {
		height: 670rpx !important;
	}

	.case-content {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 20rpx 40rpx 20rpx 40rpx;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 2;
	}

	.case-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.user-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.user-info {
		width: 400rpx;
		margin-left: 20rpx;
		font-size: 24rpx;
		color: #b5b5b5;
	}

	.user-name {
		font-size: 36rpx;
		color: #ffffff;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-break: break-all;
	}

	.button-group {
		width: 130rpx;
		justify-content: space-between;
	}

	.share-button,
	.like-button {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		font-size: 22rpx;
		color: #a8a8a8;
		text-align: center;
	}

	.case-comment {
		margin-top: 30rpx;
	}

	.case-comment.ellipse {
		display: flex;
		align-items: center;
	}

	.case-text {
		display: block;
		width: 100%;
		font-size: 28rpx;
		color: #ffffff;
		word-break: break-all;
	}

	.case-comment.ellipse .case-text {
		max-width: 525rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.collapse-button {
		font-size: 28rpx;
		color: #ffffff;
		text-align: right;
	}
}
</style>
