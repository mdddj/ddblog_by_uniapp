<template>
	<view>
		<!-- 头部基本信息 -->
		<view class="UCenter-bg" style="height: 500rpx;">
			<image v-if="config!=null" v-bind:src="config.logoSrc" class='png cu-avatar round' style="width: 150rpx;height: 150rpx;border: 1rpx solid gray;"
			 mode='widthFix'></image>
			<view style="padding-top: 65rpx;">
				<view>
					<text v-if="config!=null" style="font-size: 30rpx;color: #000000;">{{config.title}}</text>
				</view>
			</view>
			<view style="margin-top: 20rpx;">
				<text v-if="config!=null" style="font-size: 25rpx;color: grey;">{{config.description}}</text>
			</view>
		</view>
		<!-- 头部基本信息END-->

		<!-- 博客数据 -->
		<view class="padding flex text-center text-grey bg-white">
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-orange">{{countData.articleCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-news" style="margin-right: 5rpx;"></text> 博客</view>
			</view>
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-blue">{{countData.categoryCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-file" style="margin-right: 5rpx;"></text> 分类</view>
			</view>
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-green">{{countData.tagCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-tag" style="margin-right: 5rpx;"></text> 标签</view>
			</view>
			<view class="flex flex-sub flex-direction">
				<view class="text-xxl text-green">{{countData.linkCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-link" style="margin-right: 5rpx;"></text> 友链</view>
			</view>
		</view>
		<!-- 博客数据end -->

		<!-- 菜单列表 -->
		<view class="cu-list menu margin-top">
			<!-- 打赏 -->
			<view class="cu-item arrow" @tap="gotoTextPage('pay','赞赏支持')">
				<view class="content">
					<text class="cuIcon-moneybag text-grey"></text>
					<text class="text-grey">打赏支持</text>
				</view>
			</view>

			<!-- github -->
			<view class="cu-item arrow" @tap="gotoTextPage('github','Github')">
				<view class="content">
					<text class="cuIcon-github text-grey"></text>
					<text class="text-grey">Github</text>
				</view>
			</view>

			<!-- 更新日志 -->
			<view class="cu-item arrow" @tap="gotoTextPage('log','日志')">
				<view class="content">
					<text class="cuIcon-new text-grey"></text>
					<text class="text-grey">更新记录</text>
				</view>
			</view>

			<!-- 关于 -->
			<view class="cu-item arrow" @tap="gotoTextPage('about','关于')">
				<view class="content">
					<text class="cuIcon-info text-grey"></text>
					<text class="text-grey">关于</text>
				</view>
			</view>
		</view>
		<!-- 菜单列表 -->


		<bottom-nav :active='pageName'></bottom-nav>
	</view>
</template>

<script>
	import config from '../../util/app_config.js';
	import request from '../../util/request.js';

	export default {
		data() {
			return {
				pageName: 'my',
				config: null,
				countData: {},
				app_version: this.app_version,
				app_bg: 'http://picbed.demo.saintic.com/static/upload/huang/2020/04/02/15858063094785930.jpg',
				user_info: null
			}
		},
		onLoad() {
			this.config = config
			this.loadCountData();
			this.getCacheUserInfo(); // 从缓存获取已登入用户信息
		},
		methods: {

			getCacheUserInfo() {
				const userInfo = this.cache.get("user_info");
				console.log(userInfo);
				this.user_info = userInfo;
			},

			/**
			 * 获取博客统计信息
			 */
			loadCountData() {
				request.post("/blog/data").then(res => {
					if (res.code == 200 && res.data) {
						this.countData = res.data
					}
				})
			},
			/**
			 * 菜单跳转
			 * @param {Object} key	请到服务器查看,如果不存在将获取不到数据,有疑问加qq413153189免费解答
			 * @param {Object} page	页面标题
			 */
			gotoTextPage(key, page) {
				uni.navigateTo({
					url: '/pages/text/text?key=' + key + '&page=' + page
				})
			},

			// 用户登入按钮被按下
			userLoginTap() {
				// let _this = this;
				// uni.getUserInfo({
				// 	provider: 'weixin',
				// 	success: function(infoRes) {
				// 		let nickName = infoRes.userInfo.nickName; //昵称
				// 		let avatarUrl = infoRes.userInfo.avatarUrl; //头像
				// 		console.log(nickName);
				// 		try {
				// 			uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
				// 			// _this.updateUserInfo();
				// 		} catch (e) {}
				// 	},
				// 	fail(res) {}
				// });
				uni.redirectTo({
					url: '/package_login/login/login'
				})
			}

		}
	}
</script>

<style>
	.title {
		text-align: center;
	}

	.UCenter-bg {
		background-size: cover;
		height: 300rpx;
		display: flex;
		justify-content: center;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
	}

	.UCenter-bg::after {
		content: "";
		position: absolute;
		width: 100%;
		background-color: #f1f1f1;
		transform: rotate(-10deg) scale(2, 2);
		bottom: -60vw;
		left: 0;
		right: 0;
		margin: auto;

	}




	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}
</style>
