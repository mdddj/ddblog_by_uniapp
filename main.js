import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import BottomNav from './components/BottomNav.vue'
Vue.component('bottom-nav',BottomNav)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import PostCard from './components/post-card.vue'
Vue.component('post-card',PostCard)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
