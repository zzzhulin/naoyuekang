<template>
	<u-popup :show="show" :closeOnClickOverlay="false" duration="0" overlayOpacity="0.4" round="50rpx" bgColor="#fff" @close="close" @open="open">
		<view class="poster-wrapper">
			<image :src="poster" class="poster" mode="widthFix"></image>
		</view>
		<view class="share-list">
			<view class="share-item" v-for="item in list" :key="item.code" @click="share(item.code)">
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="share-button" v-if="item.code === 'weixin'"></button>
				<!-- #endif -->
				<image :src="cdnUrl + item.icon" class="share-icon"></image>
				<text>{{ item.text }}</text>
			</view>
		</view>
		<view class="cancel-button" @click="close">取消</view>
	</u-popup>
</template>

<script>
import { cdnUrl, phpBaseUrl } from '@/config';
export default {
	name: 'popup-share',
	props: {
		poster: String // 商品海报
	},
	options: {
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {
			cdnUrl,
			show: false,
			list: [
				{
					code: 'poster',
					icon: '/newEdition/dowmImg.png',
					text: '保存海报'
				},
				{
					code: 'weixin',
					icon: '/newEdition/shareWX.png',
					text: '微信好友'
				}
			]
		};
	},
	methods: {
		share(code) {
			switch (code) {
				case 'weixin':
					this.shareApp();
					break;
				case 'poster':
					this.savePoster();
					break;
				default:
					break;
			}
		},
		shareApp() {
			const sourceTime = new Date().getTime();
			const inviteCode = this.$store.state.user.inviteCode;
			const path = `/subpackage/mall/activity/index?tag=Everyday_activity&r_c=${inviteCode}&sourceTime=${sourceTime}`;
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 5,
				title: '每日福利',
				imageUrl: this.poster,
				miniProgram: {
					id: 'gh_e407523b61eb',
					path,
					// path: `/pages/mall/productDetail?id=5227`,
					type: 0,
					// webUrl: `${phpBaseUrl}/#/pages/mall/productDetail?id=5227`
					webUrl: `${phpBaseUrl}/#${path}`
				}
			});
		},
		savePoster() {
			this.$image.save(this.poster, () => {
				this.show = false;
			});
		},
		open() {
			this.show = true;
		},
		close() {
			this.show = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.poster-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	padding-bottom: 180rpx;
	z-index: -1;
}

.poster {
	width: 470rpx;
}

.share-list {
	display: flex;
	align-items: center;
	justify-content: center;
}

.share-item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 170rpx;
	padding: 40rpx 0;
	gap: 10rpx;
	font-size: 26rpx;
	color: #333;
}

.share-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
}

.share-button {
	position: absolute;
	width: 100%;
	top: 0;
	bottom: 0;
	padding: 0;
	opacity: 0;
	z-index: 9;
}

.cancel-button {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100rpx;
	border-top: 2rpx solid #f7f7f7;
	font-size: 32rpx;
	color: #666666;
}
</style>
