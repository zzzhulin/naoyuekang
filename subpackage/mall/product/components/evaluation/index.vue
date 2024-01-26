<template>
	<view class="component-evaluation">
		<!-- 商品评价 -->
		<view class="cell-content" v-if="replyList.length > 0">
			<view class="cell-item">
				<view class="cell-title">商品评价({{ replyCount }})</view>
				<view class="cell-link" @click="navigateTo('/subpackage/mall/evaluation/index')">
					<text>查看全部</text>
					<image :src="cdnUrl + '/mine/right-g.png'" class="arrow"></image>
				</view>
			</view>
			<view class="evaluation-item" v-for="item in replyList" :key="item.id">
				<view class="user-info">
					<u-image :src="item.avatar" width="60rpx" height="60rpx" shape="circle"></u-image>
					<text class="user-name">{{ item.nickname }}</text>
					<u-rate
						:value="item.product_score"
						:readonly="true"
						:inactiveIcon="cdnUrl + '/newMall/star_default.png'"
						:activeIcon="cdnUrl + '/newMall/star_active.png'"
						size="32rpx"
						gutter="0"
					></u-rate>
				</view>
				<view class="evaluation-info" :class="[item.pics.length > 0 && 'pb20']">
					<view class="evaluation-text">{{ item.comment }}</view>
					<view class="reply-content" v-if="item.merchant_reply_content">
						<view class="reply-title">官方回复</view>
						<view class="reply-text">{{ item.merchant_reply_content }}</view>
					</view>
					<block v-if="item.media_type === 1 && item.pics.length > 0">
						<u-album :urls="item.pics" space="20rpx" multipleSize="216rpx" multipleMode="aspectFill" v-if="item.pics.length > 1"></u-album>
						<u-image :src="item.pics[0]" mode="aspectFill" width="216rpx" height="216rpx" v-else @click="preview(item.pics)"></u-image>
					</block>
					<video class="video" :src="item.video_url" controls v-if="item.media_type == '2' && item.video_url"></video>
				</view>
			</view>
		</view>

		<u-line :hairline="false" length="calc(100% - 40rpx)" color="#F0F5F4" margin="10rpx 20rpx 0 20rpx" v-if="pickupList.length > 0"></u-line>

		<!-- 精选案例 -->
		<view class="cell-content case" v-if="pickupList.length > 0 && pickupList[0].pick_up == '1'">
			<view class="cell-item">
				<view class="cell-title">精选案例({{ pickupCount }})</view>
				<view class="cell-link" @click="navigateTo('/subpackage/mall/case/index')">
					<text>查看全部</text>
					<image :src="cdnUrl + '/mine/right-g.png'" class="arrow"></image>
				</view>
			</view>
			<view class="evaluation-item">
				<block v-for="item in pickupList" :key="item.id">
					<image :src="item.reply_cover + '?x-oss-process=image/resize,m_fill,h_210,w_210'" class="evaluation-image" v-if="item.media_type == '1'"></image>
					<image :src="item.reply_cover" class="evaluation-image" mode="aspectFill" v-else-if="item.media_type == '2'"></image>
					<image :src="cdnUrl + '/newMall/icon_video.png'" class="play-button" v-if="item.media_type == '2'"></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	name: 'evaluation',
	props: {
		productId: Number, // 商品id
		replyCount: Number, // 商品评价数量
		replyList: Array, // 商品评价列表
		pickupCount: Number, // 精选案例数量
		pickupList: Array // 精选案例列表
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl
		};
	},
	methods: {
		navigateTo(url) {
			this.$tab.navigateTo(`${url}?id=${this.productId}`);
		}
	}
};
</script>

<style lang="scss" scoped>
.component-evaluation {
	padding: 20rpx 0 10rpx 0;
	margin: 20rpx;
	border-radius: 24rpx;
	background: #ffffff;
	box-shadow: 0px 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.02);

	.cell-content {
		padding: 20rpx 30rpx;
	}

	.cell-content.case {
		margin: 10rpx 0 20rpx 0;
	}

	.cell-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cell-title {
		margin-bottom: 20rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #242526;
	}

	.cell-link {
		font-size: 24rpx;
		color: #a6abad;
	}

	.arrow {
		width: 15rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}

	.user-info {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
	}

	.user-name {
		margin: 0 20rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #222222;
	}

	.case .evaluation-item {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.evaluation-image {
		position: relative;
		margin-right: 30rpx;
		width: 210rpx;
		height: 210rpx;
		border-radius: 16rpx;
		overflow: hidden;
		&:last-child {
			margin-right: 0;
		}
	}

	.play-button {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		width: 38rpx;
		height: 38rpx;
		z-index: 3;
	}
	
	.evaluation-info.pb20 {
		padding-bottom: 20rpx;
	}

	.evaluation-text {
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: #626566;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-break: break-all;
	}

	.reply-content {
		margin-bottom: 20rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #f9f9f9;
		font-size: 28rpx;
	}

	.reply-title {
		color: #777777;
	}

	.reply-text {
		margin-top: 10rpx;
		color: #b5b5b5;
		word-break: break-all;
	}
}
</style>
