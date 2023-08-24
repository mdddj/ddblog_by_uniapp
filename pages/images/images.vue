<template>
	<view class="bg-gray">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">相册</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load load-cuIcon" :class="isLoad?'loading':'over'"></view>
				</view>
			</block>
		</cu-custom>

		<view class="cu-list menu  m--t m--b">
			<view class="cu-item arrow" v-for="(item,index) in list" :key="item.id"  @tap="gotoResourceList(item.name)">
				<view class="content">
					<text class="text-grey">{{item.name}}</text>
				</view>
				<view v-if="item.resourceCount!=0" class="cu-tag round bg-grey sm">{{item.resourceCount}}</view>
			</view>
		</view>

		<bottom-nav :active='pageName'></bottom-nav>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageName: "images",
				list: []
			}
		},
		onLoad() {
			this.getImagesCategorys()
		},
		methods: {

			// 获取图片群组
			async getImagesCategorys() {
				const result = await this.$request.get('/api/public/findByType-pub', {
					data: {
						"type": "images"
					}
				})
				console.log(result)
				if (result.statusCode == 200 && result.data.state == 200) {
					this.list = result.data.data
				}

			}
			,
			
			gotoResourceList(name) {
				uni.navigateTo({
					url: '/pages/resource/resource?name=' + name
				})
			}
		},
		onShareAppMessage: function(res) {
			return {
				title: this.detail.title,
				path: '/pages/images/images'
			}
		}
	}
</script>

<style>
	.m--t {
		margin-top: 12px;
	}

	.m--b {
		margin-bottom: 12px;
	}
</style>