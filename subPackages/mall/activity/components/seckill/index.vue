<template>
	<view class="component-seckill">
		<image :src="cdnUrl + '/activity/dailyBenefits_bg_02.png'" class="seckill-title"></image>
		<view class="seckill-list" v-if="list.length > 0"></view>
		<view class="empty-text" v-else>敬请期待中...</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	name: 'seckill',
	props: {
		list: Array
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl
		};
	}
};
</script>

<style lang="scss" scoped>
.component-seckill {
	.seckill-title {
		display: block;
		width: 550rpx;
		height: 44rpx;
		margin: auto;
	}

	.empty-text {
		margin-top: 30rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #ffffff;
		text-align: center;
	}
}
</style>
