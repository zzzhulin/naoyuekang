<template>
	<view class="page-academician">
		<!-- 标题栏 -->
		<u-navbar :autoBack="true" bgColor="transparent">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-w.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<!-- 背景图 -->
		<image :src="cdnUrl + '/academician/bg_top.png'" class="background" mode="aspectFill"></image>

		<!-- 院士列表 -->
		<view class="academician-list">
			<view class="academician-item" v-for="(item, index) in academicianList" :key="index">
				<image :src="cdnUrl + item.image" class="academician-image" mode="widthFix" lazy-load="true"></image>
				<view class="academician-content" :class="[item.isCollapse && 'ellipse']">
					<text v-for="(text, index_) in item.content" :key="text" class="academician-text" :class="[index_ === 1 && 'last']" v-if="item.isCollapse ? index_ < 2 : index_ > 0">
						{{ item.isCollapse ? text.slice(0, item.maxlength) + (index_ === 1 ? '. . .' : '') : text }}
					</text>
					<text v-for="(text, index_) in item.honor" :key="text" class="academician-honor" :class="[index_ === 0 && 'first']" v-if="!item.isCollapse">
						{{ text }}
					</text>
					<view class="collapse-button" @click="collapse(index)">{{ item.isCollapse ? '展开' : '收起' }}</view>
				</view>
			</view>
		</view>

		<!-- 团队理论 -->
		<view class="academician-group">
			<image :src="cdnUrl + '/academician/content_bg_01.png'" mode="widthFix" lazy-load="true" class="group-background"></image>
			<view class="group-list">
				<image v-for="item in groupList" :key="item.name" :src="cdnUrl + item.image" mode="widthFix" lazy-load="true" class="group-item" @click="navigateTo(item.name)"></image>
			</view>
		</view>

		<!-- 视频/文章列表 -->
		<view class="article-container">
			<view class="tab">
				<view class="tab-item" :class="[id === item.id && 'active']" v-for="item in tabs" :key="item.id" @click="tabChange(item.id)">{{ item.name }}</view>
			</view>
			<article-list :list="articleList"></article-list>
		</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	data() {
		return {
			cdnUrl,
			academicianList: [
				{
					image: '/academician/title_bg_01.png',
					content: [
						'英国皇家医学科学院院士;',
						'美国南加州大学药学院教授，全球研发抑制神经系统营养与能量第一人。',
						'美国国家健康机构授予大脑挑战研究基金奖获得者及首席研究员， 领导多项医学研究计划。在[自然]， [神经科学]等重要学术期刊发表论文四十多篇论文，参与著书两部。创立了"缺失支撑蛋白-抑制神经受体是阿尔兹海末痴呆症丧失认知的重要发病机制" 的理论。拥有 4 项美国专利，2项中国专利。'
					],
					honor: [
						'1998年入选美国名人录',
						'1999年入选世界名人录',
						'2008-2016年间获得六项药物开发专利',
						'2008年荣膺美国卫生部人类科学大脑研究计划挑战奖',
						'2012年荣膺世界最优秀的1000生物科学专业论述论文奖(美国)',
						'2012年荣膺“新科学家”(英国伦敦)',
						'2012年的药物发明专利被誉为“里程碑”的发明,被国际主要媒体报道',
						'2015年荣膺“新科学家”英国伦敦再次报道'
					],
					maxlength: 12,
					isCollapse: true
				},
				{
					image: '/academician/title_bg_02.png',
					content: [
						'梁京院士导师；',
						'世界脑神经权威科学家，全球首先发现抑制神经受体结构并进行系统研发第一人；',
						'加州大学医学院授予的终身杰出教授；',
						'获得过诺奖评委会评出，丹麦女王亲自授予的神经科学终身成就奖；',
						'获得哥本哈根大学授予的荣誉博士尊号；',
						'全球首先发现脑神经抑制性传导物质γ-氨基丁酸的药理结合位点，被誉为“全球抑制神经受体之父”；'
					],
					maxlength: 16,
					isCollapse: true
				}
			],
			groupList: [
				{ name: 'theory', image: '/academician/lj_team_bg_01.png' },
				{ name: 'international', image: '/academician/lj_team_bg_02.png' },
				{ name: 'domestic', image: '/academician/lj_team_bg_03.png' },
				{ name: 'application', image: '/academician/lj_team_bg_04.png' }
			],
			tabs: [
				{
					id: 8,
					name: '伟大·始于发现'
				},
				{
					id: 9,
					name: '改变·源自创新'
				},
				{
					id: 10,
					name: '睿健·案例反馈'
				}
			],
			id: 8, // 当前tab的id
			articleList: [], // 视频文章列表
			page: 1, // 页码
			hasMore: false // 加载更多
		};
	},
	onLoad() {
		this.getZxListByCate();
	},
	onReachBottom() {
		if (this.hasMore) {
			this.page++;
			this.getZxListByCate();
		}
	},
	methods: {
		// 展开/收起评价
		collapse(index) {
			this.academicianList[index].isCollapse = !this.academicianList[index].isCollapse;
		},
		// 跳转团队理论详情
		navigateTo(name) {
			this.$tab.navigateTo(`/pages/academician/detail?name=${name}`);
		},
		// tab切换
		tabChange(id) {
			this.id = id;
			this.getZxListByCate();
		},
		// 获取视频/文章列表
		getZxListByCate() {
			this.$store
				.dispatch('GetZxListByCate', {
					id: this.id,
					page: this.page,
					limit: 20
				})
				.then((res) => {
					if (this.page === 1) {
						this.articleList = res;
					} else {
						this.articleList = this.articleList.concat(res);
					}
					this.hasMore = res.length >= 10;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-academician {
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

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: -1;
	}

	.academician-list {
		display: flex;
		flex-direction: column;
		gap: 25rpx;
		margin-top: 102rpx;
		padding: 0 40rpx;
	}

	.academician-image {
		display: block;
		margin: 0 auto;
	}

	.academician-content {
		border-radius: 30rpx;
		background: linear-gradient(217deg, #ffd595 0%, #fff5e4 100%);
		padding: 40rpx;
		color: #606466;
	}

	.academician-content.ellipse {
		height: 170rpx;
		overflow: hidden;
		.academician-text.last {
			display: inline-block;
		}

		.collapse-button {
			display: inline-block;
			margin-left: 12rpx;
		}
	}

	.academician-text {
		display: block;
		margin-top: 10rpx;
		font-size: 28rpx;
		&:first-child {
			margin-top: 0;
		}
	}

	.academician-honor {
		display: flex;
		align-items: center;
		gap: 10rpx;
		margin-top: 5rpx;
		font-size: 24rpx;

		&:before {
			content: '·';
			font-weight: bold;
		}
	}

	.academician-honor.first {
		margin-top: 10rpx;
	}

	.collapse-button {
		font-weight: bold;
		font-size: 28rpx;
		color: #637da4;
	}

	.academician-group {
		position: relative;
		margin: 60rpx 40rpx;
	}

	.group-background {
		position: absolute;
		top: 0;
		width: 100%;
		z-index: -1;
	}

	.group-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20rpx;
		padding: 244rpx 0 60rpx;
	}

	.group-item {
		width: 590rpx;
	}

	.article-container {
		padding: 0 30rpx;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tab-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 76rpx;
		background: linear-gradient(217deg, #ffd595 0%, #fff5e4 100%);
		font-size: 26rpx;
		color: #606466;
	}

	.tab-item.active {
		background: #2c6cf3;
		color: #fff;
	}
}
</style>
