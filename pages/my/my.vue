<template>
	<view>
		<!-- 头部基本信息 -->
		<view class='UCenter-bg' v-bind:style="[{backgroundImage:'url('+config.bgSrc+')'}]">
			<image v-bind:src="config.logoSrc" class='png' mode='widthFix'></image>
			<view class='text-xl'>{{config.title}}
				<text class='text-df'>{{config.version}}</text>
			</view>
			<view class='margin-top-sm'>
				<text>{{config.description}}</text>
			</view>
			<image src="http://picbed.demo.saintic.com/static/upload/huang/2020/03/30/15855688412945916.gif" mode="scaleToFill" class="gif-wave"></image>
		</view>
		<!-- 头部基本信息END-->

		<!-- 博客数据 -->
		<view class="padding flex text-center text-grey bg-white">
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-orange">{{countData.articleCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-news"></text> 博客</view>
			</view>
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-blue">{{countData.categoryCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-file"></text> 分类</view>
			</view>
			<view class="flex flex-sub flex-direction solid-right">
				<view class="text-xxl text-green">{{countData.tagCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-tag"></text> 标签</view>
			</view>
			<view class="flex flex-sub flex-direction">
				<view class="text-xxl text-green">{{countData.linkCount}}</view>
				<view class="margin-top-sm">
					<text class="cuIcon-link"></text> 友链</view>
			</view>
		</view>
		<!-- 博客数据end -->

		<!-- 菜单列表 -->
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @tap="gotoTextPage('pay','赞赏支持')">
				<view class="content">
					<text class="cuIcon-moneybag text-grey"></text>
					<text class="text-grey">打赏支持</text>
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
				config: {},
				countData: {}
			}
		},
		onLoad() {
			this.config = config
			this.loadCountData();
		},
		methods: {
			/**
			 * 获取博客统计信息
			 */
			loadCountData() {
				request.post("/blog/data").then(res => {
					if (res.code == 200) {
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
		height: 700rpx;
		display: flex;
		justify-content: center;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
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

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 250rpx;
		height: 250rpx;
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
