<template>
	<view>
		<view v-if="post!=null" class="post-warp" @tap="toDetails(post.id)">
			<view class="title-warp">
				<text>{{post.title}}</text>
			</view>
			<view class="time-wrap">
				<image class="cu-avatar round sm " v-bind:src="require('../static/ava.png')"></image><text>梁典典发布于{{post.dateString}}</text>
			</view>

			<view class="redmore">
				<view class="flex">
					<view class="flex-sub margin-xs tag">
						<view class='cu-tag'><text class="cuIcon-file text-grey icon"></text>{{post.category.name}}</view>
					</view>
					<view class="flex-sub margin-xs link"><text>继续阅读<text class="cuIcon-right text-grey"></text></text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			post: {
				type: Object,
				default: null
			}
		},
		data() {
			return {

			};
		},
		methods: {
			toDetails(id) {
				uni.navigateTo({
					url: '/pages/detail/article?id=' + id
				})
			}
		}
	}
</script>

<style>
	.post-warp {
		padding: 20rpx;
		background-color: white;
		border-top: 1rpx solid rgb(238, 238, 238);
		border-bottom: 1rpx solid rgb(238, 238, 238);
		margin-bottom: -1rpx;
	
	}

	.title-warp {}

	.title-warp text {
		font-weight: 700;
		font-size: large
	}

	.time-wrap {
		margin-top: 12rpx;
		margin-bottom: 20rpx;
		color: #696969;
		font-size: 22rpx;
	}
	
	.time-wrap image{
		margin-right: 12rpx;
	}

	.redmore {
		margin-top: 50rpx;
	}


	
	.redmore .tag{
		text-align: left;
	}
	
	.redmore .link{
		text-align: right;
	}
	
	.redmore .icon {
		margin-right: 5rpx;
	}
</style>
