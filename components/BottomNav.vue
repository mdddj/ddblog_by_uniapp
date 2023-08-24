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
			<view class="action" @tap="gotoImagesPage()">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-pic" v-bind:class="active == 'images' ? 'text-green' : 'text-gray'"></text>
				</view>
				<view v-bind:class="active == 'images' ? 'text-green' : 'text-gray'">相册</view>
			</view>
			<view class="action" @tap="gotoMyPage()">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-my" v-bind:class="active == 'my' ? 'text-green' : 'text-gray'"></text>
				</view>
				<view v-bind:class="active == 'my' ? 'text-green' : 'text-gray'">我的</view>
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
		},
		methods:{
			gotoImagesPage(){
				if(this.active=='images') return
				uni.redirectTo({
					url:'/pages/images/images',
					animationType:'fade-in'
				})
			},
			gotoArticlesPage(){
				if(this.active=='articles') return
				uni.redirectTo({
					url:'/pages/articles/articles',
					animationType:'fade-in'
				})
			},
			gotoIndexPage(){
				if(this.active=='index') return
				uni.redirectTo({
					url:'/pages/index/index',
					animationType:'fade-in'
				})
			},
			gotoSearchPage(){
				if(this.active=='search') return
				uni.redirectTo({
					url:'/pages/search/search',
					animationType:'slide-in-left'
				})
			},
			gotoMyPage(){
				if(this.active=='my') return
				uni.redirectTo({
					url:'/pages/my/my',
					animationType:'slide-in-left'
				})
			}
		}
	}
</script>

<style>

</style>
