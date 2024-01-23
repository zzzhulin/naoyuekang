<template>
	<view class="page-academician-detail">
		<!-- 标题栏 -->
		<u-navbar :placeholder="true" :autoBack="true" bgColor="transparent">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<image :src="cdnUrl + item.image" :style="{ marginTop: item.marginTop }" v-for="item in images" :key="item" mode="widthFix" class="image"></image>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	data() {
		return {
			cdnUrl,
			images: [], // 图片列表
			theory: [
				{ image: '/academician/theory_icon_01.png' },
				{ image: '/academician/theory_icon_02.png', marginTop: '111rpx' },
				{ image: '/academician/theory_icon_03.png', marginTop: '50rpx' },
				{ image: '/academician/theory_icon_04.png', marginTop: '50rpx' }
			],
			international: [
				{ image: '/academician/international_icon_01.png' },
				{ image: '/academician/international_icon_02.png', marginTop: '111rpx' },
				{ image: '/academician/international_icon_03.png', marginTop: '70rpx' },
				{ image: '/academician/international_icon_04.png', marginTop: '50rpx' }
			],
			domestic: [
				{ image: '/academician/domestic_icon_01.png' },
				{ image: '/academician/domestic_icon_02.png', marginTop: '71rpx' },
				{ image: '/academician/domestic_icon_03.png', marginTop: '49rpx' }
			],
			application: [
				{ image: '/academician/application_icon_01.png' },
				{ image: '/academician/application_icon_02.png' },
				{ image: '/academician/application_icon_03.png' },
				{ image: '/academician/application_icon_04.png' },
				{ image: '/academician/application_icon_05.png' },
				{ image: '/academician/application_icon_06.png' },
				{ image: '/academician/application_icon_07.png' }
			]
		};
	},
	onLoad(option) {
		this.images = this[option.name];
	}
};
</script>

<style lang="scss" scoped>
.page-academician-detail {
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

	.image {
		display: block;
		margin: auto;
	}
}
</style>
