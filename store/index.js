import Vue from "vue"
import Vuex from 'vuex'
import request from '@/js_sdk/cooke-request/request/request.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		counts: {}
	},
	mutations:{
		loadCounts(state,payload){
			console.log(payload);
			state.counts = payload
		}
	},
	actions:{
		loadCounts(context,payload){
			
			request.get('/api/blog/statistics').then(res=>{
				console.log(res)
				context.commit('loadCounts',res.data.data);
			})
		}
	}
})

export default store