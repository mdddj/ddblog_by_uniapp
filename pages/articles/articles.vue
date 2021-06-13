<template>
	<view>
		<cu-custom  :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">归档</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load load-cuIcon" :class="isLoad?'loading':'over'"></view>
				</view>
			</block>
		</cu-custom>
		
		
		<scroll-view scroll-x class="nav text-center">
			<view class="cu-item" :class="0==TabCur?'cur text-purple':''" @tap="tabSelect" data-id="0">
				按分类
			</view>
			<view class="cu-item" :class="1==TabCur?'cur  text-purple':''" @tap="tabSelect" data-id="1">
				按时间
			</view>
			<view class="cu-item" :class="2==TabCur?'cur  text-purple':''" @tap="tabSelect" data-id="2">
				按标签
			</view>
		</scroll-view>
		
		<!-- 按分类 -->
		<view class="cu-list menu" v-if="TabCur==0">
			<view class="cu-item arrow" v-for="(item,index) in categorys" :key="index" v-if="item.size!==0" @tap="toList('cate',item.id,item.name)">
				<view class="content">
					<text class="text-grey">{{item.name}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
		</view>
		
		<!-- 按时间 -->
		<view class="cu-list menu" v-if="TabCur==1">
			<view class="cu-item arrow" v-for="(item,index) in times" :key="index" @tap="toList('time',item.months,item.months)">
				<view class="content">
					<text class="text-grey">{{item.months}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{item.count}}篇</text>
				</view>
			</view>
		</view>
		
		<!-- 按标签 -->
		<view class="cu-list menu" v-if="TabCur==2">
			<view class="cu-item arrow" v-for="(item,index) in tags" :key="index" v-if="item.count!==0" @tap="toList('tag',item.id,item.name)">
				<view class="content">
					<text class="text-grey">{{item.name}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
		</view>
		
		
		<bottom-nav :active='pageName'></bottom-nav>
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				pageName:'articles',
				categorys:[],
				times:[],
				tags:[],
				isLoad:false,
				TabCur:0
			}
		},
		onLoad() {
			this.loadArticles();
		},
		methods: {
			loadArticles(){
				this.isLoad=true;
				console.log(this.$store.state.counts)
				var obj = this.$store.state.counts;
				this.tags = obj.tags;
				this.categorys = obj.categoryList;
				this.times = obj.monthsCounts;
				
				this.isLoad = false;
			},
			toList(type,key,title){
				uni.navigateTo({
					url:'/pages/list/list?type='+type+'&key='+key+'&title='+title
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>

</style>
