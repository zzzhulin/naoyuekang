<script>
import config from './config';
import store from '@/store';
import { getToken } from '@/utils/auth';

export default {
	onLaunch: function () {
		this.initApp();
	},
	methods: {
		// 初始化应用
		initApp() {
			// 初始化应用配置
			this.initConfig();
			// 检查用户登录状态
			//#ifdef H5
			this.checkLogin();
			//#endif
			// 获取系统状态
			this.getAppStatus();
		},
		initConfig() {
			this.globalData.config = config;
		},
		checkLogin() {
			if (!getToken()) {
				this.$tab.reLaunch('/pages/login');
			}
		},
		getAppStatus() {
			this.$store
				.dispatch('GetAppStatus')
				.then((res) => {
					this.$store.dispatch('SetAppStatus', res);
				})
				.catch((err) => {
					console.log('========err', err);
				});
		}
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';

view,
scroll-view,
swiper,
button,
input,
textarea,
label,
navigator,
image {
	box-sizing: border-box;
}
</style>
