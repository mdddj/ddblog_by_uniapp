<template>
	<view>
		<view v-if="post!=null" class="cu-card article no-card" style="margin-bottom: 20rpx;" @tap="toDetails(post.id)">
			<view class="cu-item shadow">
				<view>
					<text>{{post.category.name}}</text>
				</view>
				<view class="title">
					<view class="text-cut">{{post.title}}</view>
				</view>
				<view class="content">
					<image v-if="post.cover" v-bind:src="post.cover" mode="aspectFill"></image>
					<view class="desc">
						<view>
							<view v-for="(tag,tagIndex) in post.tags" :key="tagIndex" class="cu-tag bg-red light sm round">{{tag.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			post:{
				type:Object,
				default:null
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toDetails(id) {
				uni.navigateTo({
					url: '/pages/detail/article?id=' + id
				})
			}
		}
	}
</script>

<style>

</style>
