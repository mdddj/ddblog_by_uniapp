<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">详情</block>
			<block slot="content"></block>
		</cu-custom>
		<view class="content-wrap" :style="[{padding:'0 '+pmWidth+'rpx'}]" style="padding: 10rpx;">
			<view class="content-title">{{detail ? detail.title : ''}}</view>
			<view class="medium-bottom">
				<image mode="widthFix" class="medium-avatar" v-if="author!=null" v-bind:src="author.avatar"></image>
				<view>
					<text>{{author?author.username:''}}</text>
					<view>{{detail?detail.createTime:''}}</view>
				</view>
			</view>
			<view class="post-content">
				<mp-html :content="detail?detail.content:''" :markdown='true' />
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: null,
				html: '',
				author: null,
				pmWidth: this.pmWidth,
			}
		},
		onLoad: function(options) {
			const {
				id
			} = options;
			this.getBlogDetail(id);

		},
		onShareAppMessage: function(res) {
			return {
				title: this.detail.title,
				path: '/pages/detail/article?id=' + this.detail.id,
				imageUrl: this.detail.cover != '' ? this.detail.cover :
					'http://picbed.demo.saintic.com/static/upload/huang/2020/03/30/15855610975052996.png'
			}
		},
		methods: {

			async getBlogDetail(id) {
				const result = await this.$request.get('/api/blog/get/' + id)
				if (result.statusCode == 200 && result.data.state == 200) {
					console.log(result.data)
					this.detail = result.data.data
				}
			}

		}
	}
</script>

<style>
	.content-wrap {
		background-color: white;
	}

	.post-content {
		padding-bottom: 30rpx;
	}
</style>
