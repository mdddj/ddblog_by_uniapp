<template>
	<view>
		<!-- 头部基本信息 -->
		<view class="UCenter-bg" style="height: 500rpx;">
			<image v-if="config!=null" v-bind:src="require('../../static/ava.jpg')" class='png cu-avatar round' style="width: 150rpx;height: 150rpx;border: 1rpx solid gray;"
			 mode='widthFix'></image>
			<view style="padding-top: 65rpx;">
				<view>
					<text v-if="config!=null" style="font-size: 30rpx;color: #000000;">{{config.title}}</text>
				</view>
			</view>
			<view style="margin-top: 20rpx;" class="desc">
				<text v-if="config!=null" style="font-size: 25rpx;color: grey;">{{config.description}}</text>
			</view>
		</view>
		<!-- 头部基本信息END-->

		<!-- 博客数据 -->
		<view class="padding flex text-center text-grey bg-white">
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-orange number">{{countData.blogCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-news" style="margin-right: 5rpx;"></text> 博客</view>
			</view>
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-blue number">{{countData.cateCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-file" style="margin-right: 5rpx;"></text> 分类</view>
			</view>
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-green number">{{countData.tagCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-tag" style="margin-right: 5rpx;"></text> 标签</view>
			</view>
			<view class="flex flex-sub flex-direction">
				<view class="text-xxl text-green number">0</view>
				<view class="margin-top-sm">
					<text class="cuIcon-link" style="margin-right: 5rpx;"></text> 友链</view>
			</view>
		</view>
		<!-- 博客数据end -->

		<!-- 菜单列表 -->
		<view class="cu-list menu margin-top">
			<!-- 打赏 -->
			<view class="cu-item arrow" @tap="gotoTextPage('打赏','打赏')">
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
			<!-- <view class="cu-item arrow" @tap="gotoTextPage('log','日志')">
				<view class="content">
					<text class="cuIcon-new text-grey"></text>
					<text class="text-grey">更新记录</text>
				</view>
			</view> -->

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
				
			},

			/**
			 * 获取博客统计信息
			 */
			loadCountData() {
				console.log('获取博客统计信息')
				console.log(this.$store.state.counts)
				this.countData = this.$store.state.counts;
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
		margin-top: 150rpx;
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
	
	.desc {
		text-align: center;
		margin: 20rpx;
		padding: 20rpx;
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
	
	.number {
		font-weight: 700;
	}
</style>
