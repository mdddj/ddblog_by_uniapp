<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">归档</block>
		</cu-custom>
		<view class="cu-bar margin-top bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>按分类
			</view>
		</view>
		<view class="padding flex flex-wrap bg-white">
			<button class="cu-btn margin-bottom-xs margin-right-xs"  v-for="(item,index) in categorys" :key="index" @tap="toList('cate',item.categoryId)">{{item.categoryName}}({{item.size}}篇)</button>
		</view>
		
		<view class="cu-bar margin-top bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>按时间
			</view>
		</view>
		<view class="padding flex flex-wrap bg-white">
			<button class="cu-btn margin-bottom-xs margin-right-xs" v-for="(item,index) in times" :key="index" @tap="toList('time',item.time)">{{item.time}}({{item.count}}篇)</button>
		</view>
		
		<view class="cu-bar margin-top bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>按标签
			</view>
		</view>
		<view class="padding flex flex-wrap bg-white">
			<button class="cu-btn margin-bottom-xs margin-right-xs" v-for="(item,index) in tags" :key="index" @tap="toList('tag',item.id)">{{item.name}}({{item.count}}篇)</button>
		</view>
		<bottom-nav :active='pageName'></bottom-nav>
	</view>
</template>

<script>
	
	import request from '../../util/request.js';
	export default {
		data() {
			return {
				pageName:'articles',
				categorys:[],
				times:[],
				tags:[]
			}
		},
		onLoad() {
			request.post('/archives').then(res=>{
				console.log(res);
				this.categorys=res.categorys
				this.times=res.times
				this.tags=res.tags
			})
		},
		methods: {
			toList(type,key){
				uni.navigateTo({
					url:'/pages/list/list?type='+type+'&key='+key
				})
			}
		}
	}
</script>

<style>

</style>
