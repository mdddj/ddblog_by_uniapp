<template>
	<view>
		<view v-if="post!=null" class="cu-card article no-card" style="margin-bottom: 20rpx;" @tap="toDetails(post.id)">
			<view class="cu-item shadow">
				<view class="cate">
					<text class="cuIcon-file cate-icon"></text><text>{{post.category.name}}</text>
				</view>
				<view class="title">
					<view class="text-cut post-title">{{post.title}}</view>
				</view>
				<view class="content">
					<image v-if="post.thumbnail" v-bind:src="post.thumbnail" mode="aspectFill"></image>
					<view class="desc">
						<view>
							<view v-for="(tag,tagIndex) in post.tags" :key="tagIndex"
								class="cu-tag bg-red light sm round">{{tag.name}}</view>
						</view>
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
	.cate {
		display: inline-block;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 12rpx;
		padding-top: 12rpx;
		color: white;
		text-align: center;
		border-radius: 7px;
		background-color: #0070f3;
		box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
		color: white;
		margin-left: 30rpx;
		margin-top: 15rpx;
	}

	.cate-icon {
		margin-right: 5rpx;
	}
	
	.post-title{
		font-weight: 700;
		font-size: 40rpx;
	}
</style>
