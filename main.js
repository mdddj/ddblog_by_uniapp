import Vue from 'vue'
import App from './App'
import store from './store/index.js'

// 引入插件
import request from '@/js_sdk/cooke-request/request/request.js'

// 全局配置
request.setConfig({
  baseUrl: 'http://192.168.199.77:8082', // 此为测试地址，需加入到域名白名单，或者更改为您自己的线上地址即可 https://itbug.shop:9445
  dataType: 'json', // 可删除，默认为json
  responseType: 'text', // 可删除，默认为text
  // 设置请求头，支持所有请求头设置，也可不设置，去掉header就行
  header: {
    'content-type': 'application/json'
  }
})

// 设置请求拦截器
request.interceptors.request(config => {
  return config; // 返回修改后的配置，如未修改也需添加这行
})

// 设置响应拦截器
request.interceptors.response(res => {
  return res; // 原样返回
})

Vue.prototype.$request = request;
Vue.prototype.$store = store;



Vue.config.productionTip = false

import BottomNav from './components/BottomNav.vue'
Vue.component('bottom-nav',BottomNav)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import mpHtml from './common/mp-html/mp-html.vue'
Vue.component('mp-html',mpHtml)

import PostCard from './components/post-card.vue'
Vue.component('post-card',PostCard)

import ResourceCard from './components/resource-card.vue'
Vue.component('resource-card',ResourceCard)

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
