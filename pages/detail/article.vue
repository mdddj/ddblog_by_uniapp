<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="content-wrap" :style="[{padding:'0 '+pmWidth+'px'}]">
			<view class="content-title">{{detail ? detail.title : ''}}</view>
			<view class="medium-bottom">
				<image mode="widthFix" class="medium-avatar" v-if="author!=null" v-bind:src="author.avatar"></image>
				<view>
					<text>{{author?author.username:''}}</text>
					<view>{{detail?detail.createTime:''}}</view>
				</view>
			</view>
			<view class="post-content">
				<jyf-parser id='post' :html="html"></jyf-parser>
			</view>
		</view>

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
				html: '',
				author: null,
				pmWidth: this.pmWidth
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
				this.author = res.user
			})
		},
		onShareAppMessage: function(res) {
			return {
				title: this.detail.title,
				path: '/pages/detail/article?id='+this.detail.id,
				imageUrl: this.detail.cover !='' ? this.detail.cover : 'http://picbed.demo.saintic.com/static/upload/huang/2020/03/30/15855610975052996.png'
			}
		},
		methods: {}
	}
</script>

<style>

</style>
