<template>
	<view class="page-case">
		<!-- 标题栏 -->
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" :autoBack="true" title="精选案例">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<!-- 案例列表 -->
		<view class="case-list">
			<view class="case-item" v-for="item in pickupList" :key="item.id" @click="navigateTo(item.id)">
				<view class="case-content">
					<image :src="item.reply_cover" class="case-image" mode="widthFix"></image>
					<view class="case-count">
						<u-icon :name="cdnUrl + '/familyCircle/featuredCase/case_img_icon1.png'" width="24rpx" height="24rpx" v-if="item.media_type === 1"></u-icon>
						<u-icon :name="cdnUrl + '/familyCircle/featuredCase/play_icon1.png'" width="24rpx" height="24rpx" v-if="item.media_type === 2"></u-icon>
						<text v-if="item.media_type === 1">{{ item.media_info }}</text>
						<text v-else>{{ item.media_info | formatTime }}</text>
					</view>
					<view class="case-info">
						<view class="case-text">{{ item.comment }}</view>
						<view class="flex">
							<view class="user-info">
								<image :src="item.avatar" class="user-avatar"></image>
								<text>{{ item.nickname }}</text>
							</view>
							<auth-button className="like-button" @click="like(item.id)">
								<u-icon :name="cdnUrl + '/familyCircle/featuredCase/praise_icon2.png'" width="34rpx" height="34rpx" v-if="item.already_like === 1"></u-icon>
								<u-icon :name="cdnUrl + '/familyCircle/featuredCase/praise_icon1.png'" width="34rpx" height="34rpx" v-else></u-icon>
								<text>{{ item.reply_likes }}</text>
							</auth-button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	data() {
		return {
			cdnUrl,
			pickupList: [] // 案例列表
		};
	},
	onLoad(option) {
		// 获取精选案例
		this.getPickupList(option.id);
	},
	methods: {
		// 点赞
		like(id) {
		},
		// 跳转案例详情
		navigateTo(id) {
			this.$tab.navigateTo(`/subpackage/mall/case/detail?id=${id}`);
		},
		getPickupList(pid) {
			this.$store
				.dispatch('GetPickupList', { pid, limit: 50 })
				.then((res) => {
					if (res) {
						const oddList = res.data.filter((_, index) => index % 2 === 0);
						const evenList = res.data.filter((_, index) => index % 2 !== 0);
						this.pickupList = [...oddList, ...evenList];
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
.page-case {
	min-height: 100vh;
	background-color: #f5f5f5;
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

	.case-list {
		column-count: 2;
		column-gap: 14rpx;
		padding: 40rpx 38rpx 20rpx 38rpx;
	}

	.case-item {
		position: relative;
		break-inside: avoid;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.case-content {
		position: relative;
		z-index: 1;
		margin-bottom: 20rpx;
		background-color: #fff;
		overflow: hidden;
	}

	.case-image {
		display: block;
		width: 100%;
		max-height: 500rpx;
	}

	.case-count {
		display: flex;
		align-items: baseline;
		gap: 6rpx;
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		padding: 6rpx 20rpx;
		border-radius: 20rpx;
		background-color: rgba(0, 0, 0, 0.5);
		color: #ffffff;
		font-size: 24rpx;
		text-align: center;
	}

	.case-info {
		padding: 20rpx;
	}

	.case-text {
		font-size: 28rpx;
		font-weight: bold;
		color: #222222;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-break: break-all;
	}

	.flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 10rpx;
		font-size: 24rpx;
		color: #b5b5b5;
	}

	.user-avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.like-button {
		display: flex;
		align-items: center;
		gap: 10rpx;
		font-size: 24rpx;
		color: #b5b5b5;
	}
}
</style>
