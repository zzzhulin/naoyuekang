<template>
	<view class="component-description">
		<view class="title">图文详情</view>
		<!-- 链接 -->
		<view class="link-content" v-if="data.mp_jump_url" @click="navigateTo">
			<image :src="cdnUrl + '/nyk_data/activity/activity_turntable_pic/2023-12-13/2NAFY2Tdnn.png'" class="link-background"></image>
			<view class="link-text">{{ data.mp_jump_name || '关于商品，想了解更多？科普一下吧！' }}</view>
		</view>

		<!-- 富文本详情 -->
		<rich-text :nodes="data.description"></rich-text>
	</view>
</template>

<script>
import config from '@/config';
export default {
	name: 'description',
	props: {
		data: Object // 商品信息
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl: config.cdnUrl
		};
	},
	methods: {
		navigateTo() {
			this.$tab.navigateTo('/pages/academician/index')
		}
	},
};
</script>

<style lang="scss" scoped>
.component-description {
	margin-top: 16rpx;

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 115rpx;
		font-size: 30rpx;
		color: #a6abad;
	}

	.link-content {
		display: flex;
		align-items: center;
		position: relative;
		height: 166rpx;
		font-size: 28rpx;
		color: #242426;
	}

	.link-background {
		position: absolute;
		width: 100%;
		height: 166rpx;
		z-index: 1;
	}

	.link-text {
		margin-left: 60rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: #242426;
		z-index: 5;
	}
}
</style>
