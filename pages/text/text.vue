<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{page}}</block>
		</cu-custom>
		<view class="content-wrap" :style="[{padding:'0 '+pmWidth+'px'}]">
			<view class="post-content">
				<jyf-parser v-if='textObject!=null' id='post' :html="textObject.content">加载中...</jyf-parser>
				<view v-if="textObject==null">没有内容</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	import request from '../../util/request.js';
	import parser from "@/common/jyf-parser/components/jyf-parser/jyf-parser"

	export default {
		components: {
			"jyf-parser": parser
		},
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
			loadText(key) {
				request.post("/simple/text", {
					text: key
				}).then(res => {
					if (res.code === 200) {
						console.log(res.data)
						this.textObject = res.data;
					}
				})
			}
		}
	}
</script>

<style>

</style>
