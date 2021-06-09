<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{page}}</block>
		</cu-custom>
		<view class="content-wrap" :style="[{padding:'0 '+pmWidth+'px'}]">
			<view class="post-content">
				
				<view v-if="textObject==null">没有内容</view>
			</view>
		</view>

		
	</view>
</template>

<script>


	export default {
		
		data() {
			return {
				textObject: null,
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
			
		}
	}
</script>

<style>

</style>
