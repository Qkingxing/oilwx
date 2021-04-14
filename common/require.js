import base from './config.js';


const sendRequest = (param, backpage, backtype) => {
	
	return new Promise((resolve, reject) => {
		var _self = this, 
			url = param.url,
			requestUrl = '',
			method = param.method,
			header = {},
			
			data = param.data || {}, 
			token = "",
			hideLoading = param.hideLoading || false;
			
		//拼接完整请求地址 
		if(param.type == 'php') {
			requestUrl = base.basicUrlPhp + url;
		} else {
			requestUrl = base.basicUrlJava + url;
		}
		token = uni.getStorageSync('token');
		
		// if(!data.token){//其他业务接口传递过来的参数中无token
		//     token = uni.getStorageSync('token');//参数中无token时在本地缓存中获取
		//     console.log("当前token:" + token);
		//     if(!token){//本地无token需重新登录(退出时清缓存token)
		//         _self.login(backpage, backtype);
		//         return;
		//     }else{
		//         data.token = token;
		//     }
		// }
		
		
		
		
		// var timestamp = Date.parse(new Date());//时间戳
		// data["timestamp"] = timestamp;
			
		// header: {Authorization:uni.getStorageSync('token')},
		
		if(method){
			method = method.toUpperCase();//小写改为大写
			// if(uni.getStorageSync('token') != ''){
			// 	header: {Authorization:uni.getStorageSync('token')},
			// }
			
			
			if(method=="POST"){
				if(token != ''){
					header = {'token':uni.getStorageSync('token')};
				} else {
					header = {'content-type' : "application/json"};
				}
				
			}
		}else{
			method = "GET";
			if(token != ''){
				header = {'token':uni.getStorageSync('token')};
			} else {
				header = {'content-type' : "application/json"};
			}
		}
		//用户交互:加载圈
		if (!hideLoading) {
			uni.showLoading({title:'数据加载中...'});
		}
		//网络请求
		uni.request({
			url: requestUrl,
			method: method,
			header: header,
			data: data,
			success: res => {
				resolve(res.data)
				if (res.statusCode && res.statusCode != 200) {//api错误
					uni.showModal({
						showCancel:false,
						content:'网络连接错误！'
					});
					return;
				}
				// console.log(res)
				if (res.data.status == 0) {
					if(res.data.message != ''){
						uni.showToast({
							icon:'none',
							title:res.data.message,
						})
						return;
					} 
				} else {
					uni.showToast({
						icon:'none',
						title:res.data.message,
					})
					return;
				}
				typeof param.success == "function" && param.success(res.data);
			},
			fail: (ref) => {
				uni.showModal({
					showCancel:false,
					content:'网络连接错误！'
				});
				typeof param.fail == "function" && param.fail(e.data);
			},
			complete: (rec) => {
				if (!hideLoading) {
					uni.hideLoading();
				}
				typeof param.complete == "function" && param.complete();
				return;
			}
		})
	});
}
module.exports = {
    sendRequest
};
