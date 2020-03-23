<template>
	<view>
		<cu-custom :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<!-- <block slot="content">搜索</block> -->
		</cu-custom>
		<view class="logo">
			<image src='/static/logo.png' mode="aspectFill"></image>
		</view>
		<view class="cu-bar search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @input="setValue" :adjust-position="false" type="text" placeholder="搜索或输入关键字" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="handleSearch(1)">搜索</button>
			</view>
		</view>
		<!-- 结果显示区域 -->

		<!-- 无结果 -->
		<view class="no-result text-gray" v-if="resultData==null && init">什么也没查到~</view>

		<!-- 有结果 -->
		<view class="tip text-gray" v-if="resultData && list.length>0">为您找到以下结果</view>
		<scroll-view v-if="resultData" v-for="(item, index) in list" :key="index">
			<post-card :post='item'></post-card>
		</scroll-view>

		<view class="no-result text-gray" v-if="resultData.IPageObj.current==resultData.IPageObj.pages && init || resultData.IPageObj.pages==0">没有找到其他数据</view>

		<bottom-nav :active='pageName'></bottom-nav>
	</view>
</template>

<script>
	import request from '../../util/request.js';
	export default {
		data() {
			return {
				pageName: 'search',
				searchValue: '',
				loading: false,
				init: false,
				resultData: null,
				list: []
			}
		},
		methods: {
			setValue(e) {
				this.searchValue = e.detail.value
			},
			handleSearch(page) {
				this.loading = true
				request.post('/search', {
					page,
					q: this.searchValue
				}).then(res => {
					console.log(res);
					if (page != 1) {
						this.list = this.list.concat(res.data)
					} else {
						this.list = res.data
					}
					this.resultData = res

					this.init = true
					this.loading = false
				})
			}
		},
		onReachBottom() {
			//上拉加载下一页
			if (this.resultData.IPageObj.current < this.resultData.IPageObj.pages) {
				this.handleSearch(this.resultData.IPageObj.current + 1)
			}
		}
	}
</script>

<style>
	.logo {
		text-align: center;
		margin-top: 10rpx;
	}

	.logo image {
		height: 190rpx;
		width: 190rpx;
	}

	.no-result {
		margin: 10rpx 0;
		text-align: center;
	}

	.tip {
		margin-left: 30rpx;
	}
</style>
