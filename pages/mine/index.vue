<template>
	<view class="page-mine">
		<!-- 标题栏 -->
		<u-navbar bgColor="transparent">
			<view slot="left"></view>
		</u-navbar>

		<!-- 背景 -->
		<image :src="cdnUrl + '/mine/bg_07.png'" class="background" mode="widthFix"></image>

		<!-- 用户信息 -->
		<view class="user-content">
			<auth-button>
				<image :src="cdnUrl + '/newMall/mine/img_user.png'" class="user-avatar" mode="aspectFill"></image>
				<view class="user-name">点击登录</view>
			</auth-button>
		</view>

		<!-- 账户信息 -->

		<!-- svip -->

		<!-- 菜单 -->

		<!-- banner -->

		<!-- 列表 -->
	</view>
</template>

<script>
import { cdnUrl } from '@/config';

export default {
	data() {
		return {
			cdnUrl
		};
	}
};
</script>

<style lang="scss" scoped>
.page-mine {
	padding-top: calc(140rpx + env(safe-area-inset-top));
	.background {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
}
</style>
