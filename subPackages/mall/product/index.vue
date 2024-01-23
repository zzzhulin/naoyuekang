<template>
	<view class="page-product">
		<!-- 顶部导航栏 -->
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
		<introduction
			:seckillId="seckillId"
			:appType="appType"
			:inviteCode="inviteCode"
			:points="points"
			:countdown="countdown"
			:data="storeInfo"
			@share="generatePoster"
		></introduction>

		<!-- 每日福利 -->
		<image :src="cdnUrl + '/activity/dailyBenefits_banner_01.png'" class="benefit-banner" mode="widthFix" @click="navigateTo"></image>

		<!-- 购买类型、优惠券、服务 -->
		<service :selectedAttr="selectedAttr" :buyNumber="buyNumber" :seckillId="seckillId" :coupons="coupons" :attr="productAttr" @click="openPopup"></service>

		<!-- <view v-for="(attr, index) in productAttr" :key="index">
			<text>{{ attr.attr_name }}</text>
			<view v-for="(value, vIndex) in attr.attr_value" :class="[value.check&&'checked']" :key="vIndex">
				<text @click="toggleAttr(attr, value)">{{ value.attr }}</text>
			</view>
		</view>
		<text>Selected Attributes: {{ selectedAttr }}</text> -->

		<!-- 商品评价、精选案例 -->
		<evaluation
			:productId="storeInfo.id"
			:replyCount="replyCount"
			:replyList="replyList"
			:pickupCount="pickupCount"
			:pickupList="pickupList"
			v-if="replyCount || pickupCount"
		></evaluation>

		<!-- 图文详情 -->
		<description :data="storeInfo" v-if="storeInfo.description"></description>

		<!-- 底部操作栏 -->
		<tabbar :points="points" :seckillId="seckillId" :data="storeInfo" :badge="totalCartNum"></tabbar>

		<!-- 分享弹窗 -->
		<popup-share ref="share" :data="storeInfo" :poster="poster" :appType="appType" :seckillId="seckillId" :inviteCode="inviteCode"></popup-share>

		<!-- 规格弹窗 -->
		<popup-sku
			ref="sku"
			:cartLimit="cartLimit"
			:storeInfo="storeInfo"
			:seckillInfo="seckillInfo"
			:activityInfo="activityInfo"
			:seckillId="seckillId"
			:selectedValue="selectedValue"
			:productAttr="productAttr"
			@toggleAttr="toggleAttr"
			@changeNumber="changeNumber"
		></popup-sku>

		<!-- 优惠券弹窗 -->
		<popup-coupon ref="coupon" :list="coupons"></popup-coupon>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
import banner from './components/banner';
import discount from './components/discount';
import introduction from './components/introduction';
import service from './components/service';
import evaluation from './components/evaluation';
import description from './components/description';
import tabbar from './components/tabbar';
import popupShare from './components/popup-share';
import popupSku from './components/popup-sku';
import popupCoupon from './components/popup-coupon';
import { sampleSize, shuffle } from 'lodash';
export default {
	components: {
		banner,
		discount,
		introduction,
		service,
		evaluation,
		description,
		tabbar,
		popupShare,
		popupSku,
		popupCoupon
	},
	data() {
		return {
			cdnUrl,
			isLogin: this.$store.state.system.isLogin,
			poster: '', // 分享海报
			appType: 0, // 分享类型
			inviteCode: '', // 邀请码
			seckillId: '', // 折扣商品id
			points: 0, // 商品积分
			totalCartNum: 0, // 购物车数量
			cartLimit: '', // 购物车可加购数量
			banner: [], // 轮播图
			barrages: [], // 弹幕
			storeInfo: {
				id: 0, // 商品id
				sku_package: 0, // 是否有套餐商品
				sku_package_list: [], // 套餐商品列表
				discount_price: 0, // 折扣价
				price: 0, // 销售价
				sales: 0, // 销量
				ficti: 0, // 未知属性
				stock: 0, // 限购数量
				mp_jump_url: '', // 链接url
				mp_jump_name: '', // 链接文本
				description: '', // 图文详情
				image: '', // 商品分享图片
				show_cart: 0, // 展示购物车
				userCollect: false, // 是否被收藏
				discount: 0, // 折扣
				retail_pre_back: 0 // 佣金
			},
			seckillInfo: {
				ot_price: 0, // 原价
				price: 0, // 折后价
				kill_dis: '', // 折扣
				sales: 0 // 销量
			},
			activityInfo: {
				limit_num: 0, // 限购数量
				used_num: 0 // 已购数量
			},
			countdown: 0, // 限购倒计时
			coupons: [], // 优惠券
			productAttr: [], // 商品规格
			productValue: null, // 商品规格信息
			selectedAttr: '', // 选中的规格
			selectedValue: {
				image: '', // 规格图片
				price: 0, // 规格价格
				stock: 0, // 规格库存
				suk: '', // 规格
				discount: 0, // 折扣
				discount_price: 0, // 折扣价格
				retail_pre_back: 0 // 佣金
			},
			buyNumber: 1, // 购买数量
			replyCount: 0, // 商品评价数量
			replyList: [], // 商品评价
			pickupCount: 0, // 精选案例数量
			pickupList: [] // 精选案例
		};
	},
	onLoad(option) {
		const pid = this.$store.state.mall.actionLogId || '';
		this.seckillId = option.seckill_id;
		this.points = option.points;
		// 获取商品详情
		this.getProductDetail({ ...option, pid });
		// 获取弹幕
		this.getBarrageReply(option.id);
		// 获取优惠券
		this.getCouponList(option.id);
		// 获取商品评价
		this.getReplyList(option.id);
		// 获取精选案例
		this.getPickupList(option.id);
	},
	onShow() {
		if (this.isLogin) {
			// 获取用户信息
			this.getUserInfo();
			// 获取可加购最大值
			this.getCartLimit();
		}
	},
	methods: {
		// 加减购买数量
		changeNumber(value) {
			this.buyNumber = value;
		},
		// 规格切换
		toggleAttr(attr, value) {
			attr.attr_value.forEach((item) => {
				item.check = false;
			});
			value.check = !value.check;
			this.selectedAttr = this.getSelectedAttributes();
			this.selectedValue = this.productValue[this.selectedAttr];
		},
		// 获取选中的规格
		getSelectedAttributes() {
			const selectedAttrs = [];
			this.productAttr.forEach((attr) => {
				attr.attr_value.forEach((item) => {
					if (item.check) {
						selectedAttrs.push(item.attr);
					}
				});
			});
			return selectedAttrs.join(',');
		},
		// 生成海报
		generatePoster() {
			uni.showLoading({
				title: '图片生成中',
				mask: true
			});
			const params = {
				pid: this.storeInfo.id,
				app_type: this.appType
			};
			if (this.seckillId) {
				params.app_type = '4';
				params.seckill_id = this.seckillId;
			}
			this.$store
				.dispatch('CreateProductPoster', params)
				.then((res) => {
					uni.hideLoading();
					if (res) {
						this.poster = res;
						this.$refs.share.open();
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		// 跳转活动页面
		navigateTo() {
			this.$tab.navigateTo('/subPackages/mall/activity/index?tag=Everyday_activity');
		},
		// 打开popup
		openPopup(ref) {
			this.$refs[ref].open();
		},
		getUserInfo() {
			this.$store
				.dispatch('GetUserInfo')
				.then((res) => {
					if (res) {
						this.inviteCode = res.invite_code;
						if (res.group_type === 1) {
							this.appType = 2;
						} else {
							this.appType = 3;
						}
					}
				})
				.catch((err) => {
					console.log('========err', err);
				});
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
						this.banner = [{ type: 'video', url: video_url }, ...slider_image.map((item) => ({ type: 'image', url: item }))].filter((item) => item.url);
						this.storeInfo = storeInfo;
						this.activityInfo = activityInfo;
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
						this.selectedValue = this.productValue[this.selectedAttr];
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
					this.coupons = res;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		getCartLimit() {
			this.$store
				.dispatch('GetCartLimit')
				.then((res) => {
					this.cartLimit = res;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	},
	onShareAppMessage(res) {
		const { store_name, image, id } = this.storeInfo;
		const sourceTime = new Date().getTime();
		let appType = this.appType;
		let path = `/subPackages/mall/product/index?id=${id}&isShare=true&sourceTime=${sourceTime}`;
		if (res.from === 'menu') {
			appType = 3;
		}
		if (this.seckillId) {
			path += `&s_i=${this.seckillId}`;
		}
		if (appType === 2) {
			path += `&inviteCode=${this.inviteCode}`;
		} else {
			path += `&r_c=${this.inviteCode}`;
		}
		console.log(path);
		return {
			title: store_name,
			path,
			imageUrl: this.isLogin ? this.poster : image
		};
	},
	onShareTimeline(res) {
		const { store_name, image, id } = this.storeInfo;
		const sourceTime = new Date().getTime();
		let appType = this.appType;
		let path = `/subPackages/mall/product/index?id=${id}&isShare=true&sourceTime=${sourceTime}`;
		if (res.from === 'menu') {
			appType = 3;
		}
		if (this.seckillId) {
			path += `&s_i=${this.seckillId}`;
		}
		if (appType === 2) {
			path += `&inviteCode=${this.inviteCode}`;
		} else {
			path += `&r_c=${this.inviteCode}`;
		}
		return {
			title: store_name,
			path,
			imageUrl: this.isLogin ? this.poster : image
		};
	}
};
</script>

<style lang="scss" scoped>
.page-product {
	min-height: 100vh;
	background-color: #f8f8f8;
	padding-bottom: calc(120rpx + env(safe-area-inset-bottom));

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

	/deep/ .u-swiper__indicator {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 58rpx;
		bottom: 0;
	}

	/deep/ .u-count-down__text {
		line-height: normal;
		padding: 0 10rpx;
		font-size: 26rpx;
		color: #fff;
	}

	/deep/ .u-rate .u-icon__img {
		margin-right: 8rpx;
	}

	/deep/ .u-number-box__input {
		margin: 0 10rpx;
	}
}
</style>
