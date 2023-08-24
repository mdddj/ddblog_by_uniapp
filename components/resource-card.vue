<template>
	<view v-if="resource!=null" class="cu-card dynamic no-card" style="margin-bottom: 20rpx;">
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round" :style="{backgroundImage: 'url('+resource.user.picture+')'}" />
					<view class="content flex-sub" style="left: 120rpx;">
						<view>{{resource.user.nickName}}
							<view class="cu-tag line-red sm " style="margin-left: 12rpx;"
								v-if="resource.user.enterprise!=null">{{resource.user.enterprise.name}}</view>
						</view>
						<view class="text-gray text-sm flex justify-between">
							{{resource.createDate == null || resource.createDate == '' ? '发布时间未知' : resource.createDate}}
						</view>
					</view>
				</view>
			</view>
			<view class="text-content padding-lr padding-tb">
				{{resource.content}}
			</view>

			<!-- 图片列表 -->
			<view class="grid flex-sub padding-lr col-3 grid-square" v-if="resource.images.length != 0">
				<view class="bg-img" v-for="(item,index) in resource.images" :key="index"
					:style="{backgroundImage:'url('+item.thumbnail+')'}" />
			</view>
			<view style="margin-bottom: 32rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			resource: {
				type: Object,
				default: null
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>