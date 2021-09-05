<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{page}}</block>
		</cu-custom>
		<view class="content-wrap" :style="[{padding:'0 '+pmWidth+'px'}]">
			<view class="post-content">
				
				<view v-if="text==null">没有内容</view>
				
				<view class="post-content">
					<mp-html :content="text?text:''" :markdown='true' />
				</view>
			</view>
		</view>

		
	</view>
</template>

<script>


	export default {
		
		data() {
			return {
				text: null,
				page: 'loading...',
				pmWidth:this.pmWidth
			}
		},
		onLoad(params) {
			const {
				key,
				page
			} = params;
			if (!key) {
				//key 不存在返回上一页
				umi.navigateBack(1);
			}
			if (page) this.page = page
			this.loadText(key);
		},
		methods: {
			
			loadText(name){
				var _this = this;
				this.$request.get('/api/blog/text',{
					data:{
						'name':name
					}
				}).then(res=>{
					console.log(res.data);
					if(res.data.state==200){
						_this.text = res.data.data.context;
					}
				})
			}
		}
	}
</script>

<style>

.post-content{
	padding: 12rpx;
}
.page{
	background-color: white;
}
</style>
