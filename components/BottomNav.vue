<template>
	<view>
		<view class="cu-tabbar-height"></view>
		<view class="cu-bar tabbar bg-white foot">
			<view class="action" @tap="gotoIndexPage()">
				<view class="cuIcon-cu-image">
					<text class="cuIcon-home lg " v-bind:class="active == 'index' ? 'text-green' : 'text-gray'"></text>
				</view>
				<view v-bind:class="active == 'index' ? 'text-green' : 'text-gray'">首页</view>
			</view>
			<view class="action" @tap="gotoArticlesPage()">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-apps" v-bind:class="active == 'articles' ? 'text-green' : 'text-gray'"></text>
				</view>
				<view v-bind:class="active == 'articles' ? 'text-green' : 'text-gray'">归档</view>
			</view>
			<view class="action" @tap="gotoSearchPage()">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-search" v-bind:class="active == 'search' ? 'text-green' : 'text-gray'"></text>
				</view>
				<view v-bind:class="active == 'search' ? 'text-green' : 'text-gray'">搜索</view>
			</view>
			<view class="action">
				<view class="cuIcon-cu-image">
					<image src="/static/tabbar/about.png"></image>
				</view>
				<view class="text-gray">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			active:{
				type:String,
				default:'index'
			}
		},
		data() {
			return {

			};
		},
		onLoad() {
			console.log(this.active);
		},
		methods:{
			gotoArticlesPage(){
				if(this.active=='articles') return
				uni.navigateTo({
					url:'/pages/articles/articles',
					animationType:'fade-in'
				})
			},
			gotoIndexPage(){
				if(this.active=='index') return
				uni.navigateTo({
					url:'/pages/index/index',
					animationType:'fade-in'
				})
			},
			gotoSearchPage(){
				if(this.active=='search') return
				uni.navigateTo({
					url:'/pages/search/search',
					animationType:'slide-in-left'
				})
			}
		}
	}
</script>

<style>

</style>
