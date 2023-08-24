<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">首页</block>
			<block slot="right">
				<view class="action">
					<view class="cu-load load-cuIcon" :class="isLoad?'loading':'over'"></view>
				</view>
			</block>
		</cu-custom>

		<!-- 轮播图 -->
		<swiper v-if="carousel.length!=0" class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'"
			:indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500" @change="cardSwiper"
			indicator-color="#8799a3" indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in carousel" :key="index" :class="cardCur==index?'cur':''"
				@tap="toDetail(item)">
				<image :src="item.src" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图END -->


		<!-- 博客列表 -->
		<scroll-view  v-for="(item, index) in articles" :key="index">
			<post-card :post='item'></post-card>
		</scroll-view>
		<!-- 博客列表END -->
		<view class="cu-load" :class="isLoad?'loading':'over'"></view>
		
		
		
		<!-- 模态框 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">通知</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							{{showText}}
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
				pageName: 'index',
				data: null,
				articles: [],
				isLoad: false,
				carousel: [],
				cardCur: 0,
				page: 1,
				pageSize: 10,
				modalName:'',
				showText: ''
			}
		},
		onLoad() {
			this.isLoad = true
			this.getBlogs();
			this.getDialogInfo()
			this.isLoad = false
		},
		onShareAppMessage: function(res) {
			return {
				title: this.detail.title,
				path: '/pages/index/index'
			}
		},
		methods: {

			/// 获取博客列表
			async getBlogs() {
				const result = await this.$request.get('/api/blog/list', {
					data: {
						'page': this.page,
						'pageSize': this.pageSize
					}
				})
				
				if(result.statusCode==200 && result.data.state==200){
					console.log(result.data.data.list)
					this.articles = result.data.data.list
				}
				
			},

			
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			toDetail(item) {
				uni.navigateTo({
					url: item.url
				})
			},
			async getDialogInfo(){
				const result = await this.$request.get('/api/blog/text',{
					data:{
						'name': 'dialog'
					}
				})
				console.log(result)
				if(result.statusCode==200 && result.data.state==200 && result.data.data.context!=''){
					this.modalName = 'Modal'
					this.showText = result.data.data.context
				}
			},
			hideModal(){
				this.modalName = ''
			},
			
			
		}
	}
</script>

<style>

</style>
