<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{detail ? detail.title : '详情'}}</block>
		</cu-custom>
		<jyf-parser id='post' :html="html">加载中...</jyf-parser>
	</view>
</template>

<script>
	import request from '../../util/request.js'
	import parser from "@/common/jyf-parser/components/jyf-parser/jyf-parser"
	

	
	export default {
		components: {
		    "jyf-parser": parser
		  },
		data() {
			return {
				detail: null,
				html:'',
			}
		},
		onLoad: function(options) {
			const {
				id
			} = options;
			console.log(id);
			request.post('/findPostDetail', {
				id,
				page: 1
			}).then(res => {
				console.log(res);
				this.detail = res.p
				this.html = res.p.content
			})
		},
		methods: {

		}
	}
</script>

<style>

#post .__pre {
    position: relative;
    padding: 0 1em 0 1.6em;
    margin-top: 1em;
    line-height: 1.9;
    color: #5a4f43;
    text-shadow: 0 1px 0 white;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.5), inset 0 0 5px #d8e071;
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.5), inset 0 0 5px #ddd;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-size: 100% 100%;
}

#post>code,
#post :not(.__pre)>code {
        border-radius: 2px;
        color: #e96900;
        margin: 0 2px;
        padding: 3px 5px;
        white-space: pre-wrap;
        background-color: #f8f8f8;
        font-family: Roboto Mono,Monaco,courier,monospace;
}

#post .pre-lang{
    color: #ccc;
    content: attr(data-lang);
    font-size: 14px;
    font-weight: 600;
    height: 15px;
    line-height: 15px;
    padding: 5px 10px 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
}

</style>
