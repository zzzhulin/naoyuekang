<template>
	<view class="page-product">
		<!-- navbar -->
		<u-navbar :safeAreaInsetTop="true" :fixed="true" :placeholder="true" :autoBack="true" title="商品详情">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<!-- 轮播图、弹幕、套餐商品 -->
		<banner :banner="banner" :barrages="barrages" :packageShow="storeInfo.sku_package === 1"></banner>

		<!-- 折扣 -->
		<discount :data="seckillInfo" v-if="seckillId"></discount>

		<!-- 商品价格、销量、名称、分享、限购 -->
		<introduction :seckillId="seckillId" :points="points" :countdown="countdown" :data="storeInfo"></introduction>

		<!-- 每日福利 -->
		<image :src="cdnUrl + '/activity/dailyBenefits_banner_01.png'" class="benefit-banner" mode="widthFix"></image>

		<!-- 购买类型、优惠券、服务 -->
		<service :selectedAttr="selectedAttr" :buyNumber="buyNumber" :seckillId="seckillId" :coupons="coupons"></service>

		<view v-for="(attr, index) in productAttr" :key="index">
			<text>{{ attr.attr_name }}</text>
			<view v-for="(value, vIndex) in attr.attr_value" :key="vIndex">
				<text @click="toggleCheck(attr, value)">{{ value.attr }}</text>
			</view>
		</view>
		<text>Selected Attributes: {{ selectedAttr }}</text>

		<!-- 评价 -->
		<view class="comment-container card" v-if="replyCount || pickupCount">
			<!-- 商品评价 -->
			<view class="comment-content">
				<view class="card-header">
					<view slot="title" class="card-title">商品评价({{ replyCount }})</view>
					<view slot="value" class="card-link">
						<text>查看全部</text>
						<image :src="cdnUrl + '/mine/right-g.png'" class="arrow"></image>
					</view>
				</view>
				<view class="comment-item" v-for="item in replyList" :key="item.id">
					<view class="user-info">
						<image :src="item.avatar" class="user-avatar"></image>
						<text class="user-name">{{ item.nickname }}</text>
						<u-rate
							:value="item.product_score"
							:readonly="true"
							:inactiveIcon="cdnUrl + '/newMall/star_default.png'"
							:activeIcon="cdnUrl + '/newMall/star_active.png'"
							size="32rpx"
						></u-rate>
					</view>
					<view class="user-comment">{{ item.comment }}</view>
					<view class="reply-box" v-if="item.merchant_reply_content">
						<view class="reply-title">官方回复</view>
						<view class="reply-content">{{ item.merchant_reply_content }}</view>
					</view>
				</view>
			</view>

			<!-- 精选案例 -->
			<view class="case-content"></view>
		</view>

		<!-- 图文详情 -->
		<view class="decription-container" v-if="storeInfo.description">
			<view class="title">图文详情</view>
			<!-- 链接 -->
			<view class="link-content" v-if="storeInfo.mp_jump_url">
				<image :src="cdnUrl + '/nyk_data/activity/activity_turntable_pic/2023-12-13/2NAFY2Tdnn.png'" class="link-background"></image>
				<view class="link-text">{{ storeInfo.mp_jump_name || '关于商品，想了解更多？科普一下吧！' }}</view>
			</view>

			<!-- 富文本详情 -->
			<rich-text :nodes="storeInfo.description"></rich-text>
		</view>

		<!-- tabbar -->
	</view>
</template>

<script>
import config from '@/config';
import banner from './components/banner';
import discount from './components/discount';
import introduction from './components/introduction';
import service from './components/service';
import { compact, pick, sampleSize, shuffle } from 'lodash';
export default {
	components: {
		banner,
		discount,
		introduction,
		service
	},
	data() {
		return {
			cdnUrl: config.cdnUrl,
			id: '', // 商品id
			seckillId: '', // 折扣商品id
			points: 0, // 商品积分
			banner: [], // 轮播图
			barrages: [], // 弹幕
			storeInfo: {
				sku_package: 0, // 套餐商品
				discount_price: 0, // 折扣价
				price: 0, // 销售价
				sales: 0, // 销量
				ficti: 0, // 未知属性
				stock: 0, // 限购数量
				mp_jump_url: '', // 链接url
				mp_jump_name: '', // 链接文本
				description: '' // 图文详情
			},
			seckillInfo: {
				ot_price: 0, // 原价
				price: 0, // 折后价
				kill_dis: '', // 折扣
				sales: 0 // 销量
			},
			countdown: 0, // 限购倒计时
			coupons: [], // 优惠券
			productAttr: [], // 商品规格
			productValue: null, // 商品规格信息
			selectedAttr: '', // 选中的规格
			selectedSku: {
				suk: '' // 选中规格
			},
			buyNumber: 1, // 购买数量
			replyCount: 0, // 商品评价数量
			replyList: [], // 商品评价
			pickupCount: 0, // 精选案例数量
			pickupList: [] // 精选案例
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.seckillId = option.seckill_id;
		this.points = option.points;
		// 获取商品详情
		this.getProductDetail(option);
		// 获取弹幕
		this.getBarrageReply(option.id);
		// 获取优惠券
		this.getCouponList(option.id);
		// 获取商品评价
		this.getReplyList(option.id);
		// 获取精选案例
		this.getPickupList(option.id);
	},
	methods: {
		toggleCheck(attr, value) {
			attr.attr_value.forEach((v) => {
				v.check = false;
			});
			value.check = !value.check;

			// Get selected attributes
			this.selectedAttr = this.getSelectedAttributes();
		},
		getSelectedAttributes() {
			const selectedAttrs = [];

			this.productAttr.forEach((attr) => {
				attr.attr_value.forEach((value) => {
					if (value.check) {
						selectedAttrs.push(value.attr);
					}
				});
			});

			// Join selected attributes into a string
			return selectedAttrs.join(',');
		},
		getSku(value) {},
		// 选择sku
		chooseSku(sku, isDefault) {
			this.selectedSku = pick(this.productValue, sku);
		},
		getProductDetail(params) {
			this.$store
				.dispatch('GetProductDetail', params)
				.then((res) => {
					if (res) {
						const nowTime = new Date().getTime();
						const { storeInfo, seckill_info, activityInfo, productAttr, productValue } = res;
						const { video_url, slider_image } = storeInfo;
						storeInfo.description = storeInfo.description.replace(/\<img/gi, '<img style="display:block;max-width:100%;min-width: 100%;height: auto;"');
						this.banner = compact([video_url, ...slider_image]);
						this.storeInfo = storeInfo;
						this.seckillInfo = Array.isArray(seckill_info) ? this.seckillInfo : seckill_info;
						this.countdown = activityInfo ? activityInfo.end_at * 1000 - nowTime : 0;
						this.productAttr = productAttr.map((attr) => {
							// 默认选中第一个
							attr.attr_value[0].check = true;
							return attr;
						});
						this.productValue = productValue;
						// 初始化选中的属性
						this.selectedAttr = this.getSelectedAttributes();
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getBarrageReply(pid) {
			this.$store
				.dispatch('GetBarrageReply', { pid })
				.then((res) => {
					// 生成距离顶部top值的数组
					const arr = [];
					for (let i = 1; i < 6; i++) {
						arr.push(i * 74);
					}
					// 打乱数组
					const topList = shuffle(arr);
					// 从数组随机取几个数
					if (res.length >= 5) {
						res = sampleSize(res, 5);
					}
					// 设置每条弹幕距离顶部top的值
					res.forEach((item, index) => {
						item.top = topList[index];
					});
					this.barrages = res;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getReplyList(pid) {
			this.$store
				.dispatch('GetReplyList', { pid, limit: 1 })
				.then((res) => {
					if (res) {
						this.replyCount = res.count;
						this.replyList = res.data;
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getPickupList(pid) {
			this.$store
				.dispatch('GetPickupList', { pid, limit: 3 })
				.then((res) => {
					if (res) {
						this.pickupCount = res.count;
						this.pickupList = res.data;
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getCouponList(pid) {
			this.$store
				.dispatch('GetCouponList', { pid, limit: 20 })
				.then((res) => {
					if (res) {
						this.coupons = res;
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-product {
	min-height: 100vh;
	background-color: #f8f8f8;

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

	.benefit-banner {
		display: block;
		width: 702rpx;
		margin: auto;
	}

	.decription-container {
		padding-bottom: calc(200rpx + env(safe-area-inset-bottom));
	}

	.decription-container .title {
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

	.card {
		margin: 20rpx;
		border-radius: 24rpx;
		background: #ffffff;
		box-shadow: 0px 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.02);
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-title {
		margin-bottom: 20rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #242526;
	}

	.card-link {
		font-size: 24rpx;
		color: #a6abad;
	}

	.card-link .arrow {
		width: 15rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}

	.comment-container {
		padding: 20rpx 0 10rpx 0;
	}

	.comment-content {
		padding: 20rpx 30rpx;
	}

	.user-info {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
	}

	.user-avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 60rpx;
	}

	.user-name {
		margin: 0 20rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #222222;
	}

	/deep/ .u-rate .u-icon__img {
		padding: 0 !important;
		margin-right: 8rpx;
	}

	@keyframes barrageAnimate {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-1700rpx);
		}
	}
}
</style>
