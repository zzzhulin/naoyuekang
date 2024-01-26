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
		seckillId: String, // 折扣商品id
		inviteCode: String, // 邀请码
		appType: Number, // 分享类型
		poster: String, // 商品海报
		data: Object // 商品信息
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
					code: 'weixin',
					icon: '/newEdition/shareWX.png',
					text: '微信好友'
				},
				{
					code: 'poster',
					icon: '/newEdition/dowmImg.png',
					text: '保存海报'
				},
				{
					code: 'h5',
					icon: '/newEdition/linkImg.png',
					text: '生成专属链接'
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
				case 'h5':
					this.shareH5();
					break;
				default:
					break;
			}
		},
		shareApp() {
			const { store_name, id } = this.data;
			const sourceTime = new Date().getTime();
			let path = `/subpackage/mall/product/index?id=${id}&isShare=true&sourceTime=${sourceTime}`;
			if (this.seckillId) {
				path += `&s_i=${this.seckillId}`;
			}
			if (this.appType === 2) {
				path += `&inviteCode=${this.inviteCode}`;
			} else {
				path += `&r_c=${this.inviteCode}`;
			}
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 5,
				imageUrl: this.poster,
				title: store_name,
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
		shareH5() {
			uni.setClipboardData({
				data: `${phpBaseUrl}/#/pages/mall/productDetail?id=5227`,
				success: function () {
					this.$modal.showToast('链接复制成功，快去分享给好友吧')
				}
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
	padding-bottom: 260rpx;
	z-index: -1;
}

.poster {
	width: 530rpx;
}

.share-list {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 56rpx;
}

.share-item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 33.33%;
	padding: 40rpx 0;
	gap: 10rpx;
	font-size: 28rpx;
	color: #626566;
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
