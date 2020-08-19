/**
 * 针对uniapp数据缓存优化,可控制数据缓存时间
 * 
 *
 */
const postfix = 'simpleCache'; // 缓存前缀

const simpleCache = {
	postfix: postfix,
}


/**
 * 写入缓存
 * @param {String} key 本地缓存中的指定的key
 * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param {Number} time 保存的时间, 数字类型,单位秒 为空则永久有效.
 */
simpleCache.put = function(key, data, time) {
	uni.setStorageSync(key, data)
	var seconds = parseInt(time);
	if (seconds > 0) {
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000 + seconds;
		uni.setStorageSync(key + postfix, timestamp + "")
	} else {
		uni.removeStorageSync(key + postfix)
	}
}

/**
 * 从本地缓存中同步获取指定 key 对应的内容。
 * @param {String} key 本地缓存中的指定的 key
 * @param def 获取失败时的默认内容,可以为空.
 */
simpleCache.get = function(key, def) {
	var deadtime = parseInt(uni.getStorageSync(key + postfix))
	if (deadtime) {
		if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
			if (def) {
				return def;
			} else {
				uni.removeStorageSync(key + postfix)
				return false;
			}
		}
	}
	var res = uni.getStorageSync(key);
	if (res) {
		return res;
	} else {
		if (def == undefined || def == "") {
			def = false;
			uni.removeStorageSync(key)
		}
		return def;
	}
}

/**
 * 从本地缓存中同步移除指定 key。
 * @param {String} key 本地缓存中的指定的 key
 */
simpleCache.remove = function(key) {
	uni.removeStorageSync(key);
	uni.removeStorageSync(key + postfix);
}

/**
 * 同步清理本地数据缓存。
 */
simpleCache.clear = function() {
	// 这里面其实可以扩展你不想清理的缓存,比如你保存的用户登录状态. 在清理之前先获取一次.
	// var user = simpleCache.get("user_info"); 
	uni.clearStorageSync();
	// simpleCache.put("user_info",user); // 等 其它的自行扩展.
}

// export default simpleCache

module.exports = {
	put:simpleCache.put,
	get:simpleCache.get,
	remove:simpleCache.remove,
	clear:simpleCache.clear
}
