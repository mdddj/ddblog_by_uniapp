<script>
	import Vue from 'vue'
	import request from 'util/request.js';
	import simpleCache from '@/common/cache.js';
	export default {
		onLaunch: function() {
			
			Vue.prototype.cache = simpleCache;
			//获取文章详情两边间隙
			request.post("/simple/text", {
				text: 'detailWidth'
			}).then(res => {
				if (res.code === 200 && res.data && res.data.content) {
					Vue.prototype.pmWidth = res.data.content
				}
			})

			// 获取小程序版本号
			request.post("/simple/text", {
				text: 'version'
			}).then(res => {
				if (res.code === 200 && res.data && res.data.content) {
					Vue.prototype.app_version = res.data.content
				}
			})

			// 获取背景图片
			request.post("/simple/text", {
				text: 'bg'
			}).then(res => {
				if (res.code === 200 && res.data && res.data.content) {
					Vue.prototype.app_bg = res.data.content
				}
			})


			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				},

			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("colorui/main.css");
	@import url("colorui/icon.css");
	@import url("static/app.css");
</style>
