<template>
	<view class="component-tabbar">
		<view class="tabs">
			<block v-for="item in tabs" :key="item.code">
				<auth-button :isLogin="item.isLogin" className="tab-item" v-if="item.show" @click="tabClick(item.code)">
					<image :src="cdnUrl + item.icon" class="tab-icon"></image>
					<text>{{ item.text }}</text>
				</auth-button>
			</block>
		</view>
		<view class="buttons">
			<block v-for="item in buttons" :key="item.code">
				<auth-button :className="item.plain ? 'button-item plain' : 'button-item'" v-if="item.show">
					<text>{{ item.text }}</text>
				</auth-button>
			</block>
		</view>
	</view>
</template>

<script>
import config from '@/config';
export default {
	name: 'tabbar',
	props: {
		seckillId: String,
		data: Object,
		badge: Number,
		points: Number
	},
	options: {
		styleIsolation: 'shared',
		virtualHost: true //  去掉组件外层节点
	},
	watch: {
		data(newValue) {
			const { show_cart, userCollect } = newValue;
			this.tabs = [
				{
					isLogin: false,
					show: this.seckillId || show_cart !== 1,
					icon: '/newMall/icon_b_tab.png',
					text: '首页',
					code: 'home'
				},
				{
					isLogin: false,
					show: true,
					icon: '/newMall/icon_b_tab_01.png',
					text: '客服',
					code: 'customer'
				},
				{
					isLogin: true,
					show: true,
					icon: userCollect ? '/newMall/nav_2_c.png' : '/newMall/icon_b_tab_03.png',
					text: '收藏',
					code: 'collect'
				},
				{
					isLogin: true,
					show: !this.seckillId && show_cart === 1,
					icon: '/newHome/buyCar.png',
					text: '购物车',
					code: 'cart',
					bage: this.badge
				}
			];
			this.buttons = [
				{
					show: !this.seckillId && show_cart === 1,
					plain: true,
					code: 'add',
					text: '加入购物车'
				},
				{
					show: this.points > 0,
					plain: false,
					code: 'exchange',
					text: '立即兑换'
				},
				{
					show: !this.points,
					plain: false,
					code: 'bug',
					text: '立即购买'
				}
			];
		}
	},
	data() {
		return {
			cdnUrl: config.cdnUrl,
			tabs: [],
			buttons: []
		};
	},
	methods: {
		tabClick(code) {
			switch (code) {
				case 'home':
					this.$tab.switchTab('/pages/mall/index');
					break;
				case 'customer':
					this.$modal.showToast('敬请期待')
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style lang="scss">
.component-tabbar {
	position: fixed;
	width: 100%;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx 30rpx;
	padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
	background-color: #fff;
	z-index: 99;

	.tabs {
		display: flex;
		justify-content: space-between;
		align-content: center;
		width: 250rpx;
		height: 100rpx;
	}

	.tab-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		color: #242526;
	}

	.tab-icon {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 6rpx;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 400rpx;
		border-radius: 100rpx;
		overflow: hidden;
	}

	.button-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 78rpx;
		font-size: 30rpx;
		background-color: #f74e3f;
		color: #fff;
	}

	.button-item.plain {
		background-color: #fee7de;
		color: #f74e3f;
	}
}
</style>
