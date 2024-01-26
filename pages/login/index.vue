<template>
	<view class="page-login">
		<!-- 标题栏 -->
		<u-navbar :placeholder="true" :autoBack="true" title="登录">
			<view class="back-button" slot="left">
				<image :src="cdnUrl + '/mine/left-b.png'" class="back-icon"></image>
			</view>
		</u-navbar>

		<view class="logo-content">
			<image :src="cdnUrl + '/launch/login_logo.png'" mode="widthFix" class="logo"></image>
		</view>

		<view class="form-content">
			<u-form :model="formData" :rules="rules" ref="form" errorType="toast">
				<u-form-item prop="username">
					<u-input
						v-model="formData.username"
						:prefixIcon="cdnUrl + '/launch/icon_phone.png'"
						prefixIconStyle="width:40rpx;height:40rpx;margin-right:16rpx"
						border="none"
						placeholder="请输入手机号"
						placeholderStyle="font-size: 32rpx;color: #D3DBE0;font-weight: normal;"
					>
						<u-icon :slot="formData.username ? 'suffix' : null" :name="cdnUrl + '/mine/close.png'" width="28rpx" height="28rpx" @click="clear"></u-icon>
					</u-input>
				</u-form-item>
				<u-form-item prop="password">
					<u-input
						v-model="formData.password"
						:prefixIcon="cdnUrl + '/launch/icon_code.png'"
						maxlength="4"
						prefixIconStyle="width:40rpx;height:40rpx;margin-right:16rpx"
						border="none"
						placeholder="请输入验证码"
						placeholderStyle="font-size: 32rpx;color: #D3DBE0;font-weight: normal;"
					></u-input>
					<view slot="right">
						<u-code ref="code" @change="toggleCodeText" startText="获取验证码" changeText="xs" endText="获取验证码"></u-code>
						<text @click="getVeryCode" :text="codeText" class="code-text" :class="[!isValid && 'disabled']">{{ codeText }}</text>
					</view>
				</u-form-item>
			</u-form>
			<view class="login-button" :class="[!(isValid && formData.password.length === 4) && 'disabled']" @click="login">登录</view>
		</view>
	</view>
</template>

<script>
import { cdnUrl } from '@/config';
export default {
	data() {
		return {
			cdnUrl,
			isValid: false, // 手机号是否有效
			formData: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur']
					},
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '请输入正确的手机号',
						trigger: ['blur']
					},
					{
						trigger: ['change'],
						validator: (rule, value, callback) => {
							this.isValid = uni.$u.test.mobile(value);
						}
					}
				],
				password: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['blur', 'change']
					}
				]
			},
			codeText: '',
			openId: ''
		};
	},
	onLoad() {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				this.getOpenId(res.code);
			}
		});
	},
	onReady() {
		//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
		this.$refs.form.setRules(this.rules);
	},
	methods: {
		// 获取openId
		getOpenId(code) {
			this.$store
				.dispatch('GetOpenId', { code })
				.then((res) => {
					this.openId = res;
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		// 获取验证码
		getVeryCode() {
			if (!this.formData.username) {
				this.$modal.showToast('请输入手机号！');
				return;
			}
			if (!this.isValid) {
				this.$modal.showToast('请输入正确的手机号！');
				return;
			}
			if (this.$refs.code.canGetCode) {
				this.$store
					.dispatch('GetVeryCode', { mobile: this.formData.username })
					.then((res) => {
						this.$modal.showToast('验证码发送成功！');
						this.$refs.code.start();
					})
					.catch((err) => {
						console.log('========err', err);
					});
			} else {
				this.$modal.showToast('1分钟内只能发送一次验证码！');
			}
		},
		// 登录
		login() {
			const { brand, model, system } = uni.getDeviceInfo();
			const params = {
				...this.formData,
				openId: this.openId,
				invite_code: '',
				grant_type: 'password',
				scope: 'server',
				login_type: 'VERIFY_CODE',
				anonymousId: this.openId,
				regPageName: '/',
				platform: 1,
				brand,
				model,
				system
			};
			this.$store
				.dispatch('Login', params)
				.then((res) => {
					this.$tab.switchTab('/pages/home/index');
				})
				.catch((err) => {
					console.log('========err', err);
				});
		},
		// 验证码文本变更
		toggleCodeText(text) {
			this.codeText = text;
		},
		// 清空输入框
		clear() {
			this.formData.username = '';
		}
	}
};
</script>

<style lang="scss" scoped>
.page-login {
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

	.logo-content {
		margin: 80rpx auto 0 auto;
		text-align: center;
	}

	.logo {
		width: 240rpx;
		height: 240rpx;
	}

	.form-content {
		padding: 100rpx 75rpx;
	}

	/deep/ .u-form-item {
		padding: 0 16rpx;
		background-color: #f7f7f7;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
	}

	/deep/ .u-form-item__body {
		padding: 30rpx 0;
	}

	/deep/ .u-input__content__field-wrapper__field {
		height: initial;
		font-weight: bold;
		font-size: 32rpx !important;
		color: #242426 !important;
	}

	.code-text {
		font-size: 32rpx;
		color: #5975ff;
	}

	.code-text.disabled {
		color: #636366;
	}

	.login-button {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 88rpx;
		margin: 70rpx 0 30rpx 0;
		border-radius: 55rpx;
		background: #5975ff;
		font-size: 34rpx;
		color: #fff;
	}

	.login-button.disabled {
		background: #d9dadb;
	}
}
</style>
