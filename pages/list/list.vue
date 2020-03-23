<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load load-cuIcon" :class="isLoad?'loading':'over'"></view>
				</view>
			</block>
		</cu-custom>
		<!-- 按分类归档 -->
		<scroll-view v-if="type=='cate' && cateData" v-for="(item, index) in cateList" :key="index">
			<post-card :post='item'></post-card>
		</scroll-view>
		<view class="not-more" v-if="type=='cate' && cateData && cateData.data.current==cateData.data.pages || cateData.data.pages==0">没有更多了</view>

		<!-- 按时间归档 -->
		<scroll-view v-if="type=='time' && timeData" v-for="(item, index) in timeList" :key="index">
			<post-card :post='item'></post-card>
		</scroll-view>
		<view class="not-more" v-if="type=='time' && timeData && timeData.current==timeData.pages || timeData.pages==0">没有更多了</view>
		
		<!-- 按标签归档 -->
		<scroll-view v-if="type=='tag' && tagData" v-for="(item, index) in tagList" :key="index">
			<post-card :post='item'></post-card>
		</scroll-view>
		<view class="not-more" v-if="type=='tag' && tagData && tagData.IPageObj.current==tagData.IPageObj.pages || tagData.IPageObj.pages==0">没有更多了</view>
	</view>
</template>

<script>
	import request from '../../util/request.js'
	export default {
		data() {
			return {
				cateData: null,
				cateList: [],
				type: '',
				key: null,
				loading: false,
				timeList: [],
				timeData: null,
				tagData: null,
				tagList: [],
				title:'loading...'
			}
		},
		onLoad: function(options) {
			const {
				type,
				key
			} = options;
			// 缺少参数返回上一页
			if (!type || !key) {
				uni.navigateBack({
					delta: 1
				})
			}

			this.type = type
			this.key = key

			switch (type) {
				case 'cate':
					this.getCategoryList(key, 1)
					break;
				case 'time':
					this.getTimeList(key, 1)
					break;
				case 'tag':
					this.getTagList(key, 1)
					break;
			}
		},
		methods: {
			getCategoryList(id, page) {
				this.loading = true
				request.post('/category/articles', {
					categoryId: id,
					page
				}).then(res => {
					this.cateData = res
					if (page != 1) {
						this.cateList = this.cateList.concat(res.list)
					} else {
						this.cateList = res.list
					}
					this.loading = false
					this.title=res.info.name
				})
			},
			getTimeList(key, page) {
				this.loading = true
				request.post('/category/bytime', {
					time: key,
					page
				}).then(res => {
					this.timeData = res.data;
					if (page != 1) {
						this.timeList = this.timeList.concat(res.list)
					} else {
						this.timeList = res.list
					}
					this.loading = false
					this.title=this.key
				})
			},
			getTagList(key,page){
				this.loading=true
				request.post('/getListByTag',{id:key,page}).then(res=>{
					console.log(res);
					this.tagData=res
					if(page!=1){
						this.tagList=this.tagList.concat(res.data)
					}else{
					this.tagList=res.data
					this.title=res.info.name
					}
				})
			}
		},
		onReachBottom() {
			if (this.type == 'cate') {
				if (this.cateData.data.current < this.cateData.data.pages) {
					this.getCategoryList(this.key, this.cateData.data.current + 1);
				}
			} else if (this.type == 'time') {
				if (this.timeData.current < this.timeData.pages) {
					this.getTimeList(this.key, this.timeData.current + 1);
				}
			} else if(this.type=='tag'){
				if(this.tagData.IPageObj.current < this.tagData.IPageObj.pages){
					this.getTagList(this.key,this.tagData.IPageObj.current+1)
				}
			}
		}
	}
</script>

<style>
	.not-more {
		text-align: center;
		margin: 10rpx 0;
	}
</style>
