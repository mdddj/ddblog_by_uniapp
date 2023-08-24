<!-- 动态页面 -->

<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">动态列表</block>
			<block slot="content"></block>
		</cu-custom>
		
		
		<scroll-view v-if="list.length != 0" >
			<resource-card v-for="(item,index) in list" :key="item.id" :resource="item"></resource-card>
		</scroll-view>
		
		
		<view v-if="isEmpty != null && isEmpty == true" class="m-empty">
			暂时没有内容,典典加急创作中~
		</view>
		
		
		
		
	</view>
</template>

<script>


	export default {
		data() {
			return {
				list: [],
				isEmpty: Boolean,
				name: String
			}
		},
		
		
		
		
		methods: {

			// 获取动态列表
			async getDataList(name) {
				const result = await this.$request.get('/api/app/resource/list',{
					data: {
						page: '0',
						pageSize: 1000,
						name: name
					}
				})
				if(result.statusCode == 200 && result.data.state == 200){
					const data = result.data.data
					this.list = data.content
					this.isEmpty = data.empty
				}
			},
			getInfo(){ 
				let $this = this
				uni.getSystemInfo({
					success:function(e){
						console.log(e)
						$this.screenHeight = e.screenHeight
					}
				})
			}
		},
		onShareAppMessage: function(res) {
			return {
				title: this.detail.title,
				path: '/pages/resource/resource?name='+this.name
			}
		},
		onLoad:function(options){
			this.name = options.name
			this.getDataList(options.name)
			this.getInfo()
		}
	}
</script>

<style>

.m-empty {
	width: 100%;
	text-align: center;
	margin-top: 130rpx;
	color: gray;
}
</style>