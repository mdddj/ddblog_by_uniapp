import uni_request from '../common/uni_request/uni_request.js'

const request =  uni_request({ // 有效配置项只有三个
	baseURL: 'http://192.168.199.118/api', //baseURL
	timeout: 10000, // 超时时间
	header: {
		'content-type': 'application/json'
	} // 设置请求头，建议放在请求拦截器中
})

request.onerror = async (...args) => { // 请求失败统一处理方法（可以也可以使用异步方法）
	console.log('网络请求失败了', `url为${args[1]}`)
}

export default request;