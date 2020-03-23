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
		<scroll-view v-if="data" v-for="(item, index) in articles" :key="index">
			<post-card :post='item'></post-card>
		</scroll-view>
		<view class="cu-load" :class="isLoad?'loading':'over'"></view>
		<bottom-nav :active='pageName'></bottom-nav>
	</view>
</template>

<script>
	import request from '../../util/request.js'

	export default {
		data() {
			return {
				pageName: 'index',
				data: null,
				articles: [],
				isLoad: false
			}
		},
		onLoad() {
			this.isLoad = true
			request.post('/articles', {
				p: 1
			}).then(res => {
				console.log(res);
				this.data = res
				this.articles = res.dtolist
				this.isLoad = false
			})

		},
		onReachBottom() {
			const {
				pager
			} = this.data;
			console.log(pager);
			if (pager.current < pager.pages && !this.isLoad) {
				//还存在下一页
				this.isLoad = true
				request.post('/articles', {
					p: pager.current + 1
				}).then(res => {
					console.log(res);
					this.data = res
					this.articles = this.articles.concat(res.dtolist);
					this.isLoad = false
				})
			} 
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
