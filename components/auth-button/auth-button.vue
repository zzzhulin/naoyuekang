<template>
	<view :class="className" @click.stop="click">
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'auth-button',
	props: {
		isLogin: {
			type: Boolean,
			default: true
		},
		className: String
	},
	options: {
		styleIsolation: 'shared',
		virtualHost: true //  去掉组件外层节点
	},
	data() {
		return {};
	},
	methods: {
		click() {
			if (!this.isLogin) {
				this.$emit('click');
				return;
			}
			if (this.$auth.checkLogin()) {
				this.$emit('click');
			}
		}
	}
};
</script>
