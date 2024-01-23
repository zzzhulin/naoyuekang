<template>
	<view class="page-video">
		<!-- 标题栏 -->
		<u-navbar :autoBack="true" bgColor="transparent">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-w.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<video :src="videoUrl" class="video" controls autoplay></video>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	data() {
		return {
			cdnUrl,
			videoUrl: ''
		};
	},
	onLoad(option) {
		this.videoUrl = option.url;
	}
};
</script>

<style lang="scss" scoped>
.page-video {
	position: relative;
	min-height: 100vh;
	background-color: #000;

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

	.video {
		width: 100%;
		height: 900rpx;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
}
</style>
