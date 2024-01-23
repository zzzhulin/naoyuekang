<template>
	<view class="page-evaluation">
		<!-- 标题栏 -->
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" :autoBack="true" title="商品评价">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<!-- 评价列表 -->
		<view class="evaluation-list">
			<view class="evaluation-item" v-for="item in replyList" :key="item.id">
				<view class="evaluation-header">
					<image :src="item.avatar" class="user-avatar" mode="aspectFill"></image>
					<view class="user-info">
						<view class="user-name">
							<text>{{ item.nickname }}</text>
							<text class="add-time">{{ item.add_time }}</text>
						</view>
						<view class="product-rate">
							<text>商品评价</text>
							<u-rate
								:value="item.product_score"
								:readonly="true"
								:inactiveIcon="cdnUrl + '/newMall/star_default.png'"
								:activeIcon="cdnUrl + '/newMall/star_active.png'"
								size="24rpx"
								gutter="0"
							></u-rate>
						</view>
					</view>
				</view>
				<view class="evaluation-container" :class="[item.pics.length > 0 && 'pb20']">
					<view class="evaluation-text">{{ item.comment || '此用户没有填写评价' }}</view>
					<view class="reply-content" v-if="item.merchant_reply_content">
						<view class="reply-title">官方回复</view>
						<view class="reply-text">{{ item.merchant_reply_content }}</view>
					</view>
					<block v-if="item.media_type === 1 && item.pics.length > 0">
						<u-album :urls="item.pics" space="20rpx" multipleSize="216rpx" multipleMode="aspectFill" v-if="item.pics.length > 1"></u-album>
						<u-image :src="item.pics[0]" mode="aspectFill" width="216rpx" height="216rpx" v-else @click="preview(item.pics)"></u-image>
					</block>
					<video :src="item.video_url" controls v-if="item.media_type === 2 && item.video_url"></video>
				</view>
			</view>
		</view>
		<u-loadmore
			:status="status"
			:fontSize="status === 'nomore' ? '26rpx' : '28rpx'"
			:color="status === 'nomore' ? '#bbb' : '#888'"
			:marginTop="replyList.length === 0 ? 10 : 0"
			:marginBottom="replyList.length === 0 ? 10 : 0"
			height="100rpx"
			loadmoreText="上拉显示更多"
			nomoreText="暂无更多信息了"
		/>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	data() {
		return {
			cdnUrl,
			status: 'loading',
			replyList: [], // 评价列表
			id: '', // 商品id
			page: 1, // 页码
			hasMore: false // 加载更多
		};
	},
	onLoad(option) {
		this.id = option.id;
		// 获取商品评价
		this.getReplyList();
	},
	onReachBottom() {
		if (this.hasMore) {
			this.status = 'loading';
			this.page++;
			this.getReplyList();
		} else {
			this.status = 'nomore';
		}
	},
	methods: {
		// 预览图片
		preview(urls) {
			this.$image.preview(urls);
		},
		getReplyList() {
			this.$store
				.dispatch('GetReplyList', { pid: this.id, limit: 20, page: this.page })
				.then((res) => {
					if (res) {
						if (this.page === 1) {
							this.replyList = res.data;
						} else {
							this.replyList = this.replyList.concat(res.data);
						}
						this.hasMore = res.data.length >= 10;
						if (!res.data.length || res.data.length === res.count) {
							this.status = 'nomore';
						}
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-evaluation {
	padding-bottom: env(safe-area-inset-bottom);

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

	.evaluation-item {
		padding: 20rpx 30rpx;
		margin-bottom: 20rpx;
		&:first-child {
			margin-top: 40rpx;
		}
	}

	.evaluation-header {
		display: flex;
		align-items: center;
	}

	.user-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.user-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		padding-left: 20rpx;
	}

	.user-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
		font-weight: bold;
		color: #222222;
	}

	.add-time {
		font-weight: normal;
		font-size: 24rpx;
		color: #909399;
	}

	.product-rate {
		display: flex;
		align-items: center;
		gap: 20rpx;
		font-size: 24rpx;
		color: #b5b5b5;
	}
	/deep/ .u-rate .u-icon__img {
		margin-right: 4rpx;
	}

	.evaluation-container.pb20 {
		padding-bottom: 20rpx;
	}

	.evaluation-text {
		margin: 20rpx 0;
		font-size: 28rpx;
		color: #222222;
		word-break: break-all;
	}
}
</style>
