<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="content">微信授权</block>
		</cu-custom>
		<view>
			<view class='header'>
				<image src='../../static/images/logo.png'></image>
			</view>
			<view class='content-c'>
				<view>油客云申请获取以下权限</view>
				<text>获得您的公开信息(昵称，头像、地区等)</text>

				<!-- #ifdef MP-WEIXIN -->
				<text>获得您的微信绑定手机号</text>
				<!-- #endif -->
			</view>

			<!-- #ifdef MP-WEIXIN -->
			<button class='cu-btn bg-blue round lg shou-btn' type='primary' @tap="wxGetUserInfo">授权登录</button>
			<!-- #endif -->


			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">提示</view>
					</view>
					<view class="padding-xl">
						<view class='content-c' style="padding:0;margin:0">
							<view class='header-mask'>
								<!-- <image src='../../static/images/logo.png'></image> -->
							</view>
							<!-- #ifdef MP-WEIXIN -->
							<view>油客云申请获取您的微信绑定手机号</view>
							<!-- #endif -->
						</view>
					</view>
					<view class=" bg-white justify-end">
						<view class="action flex justify-between two-btn">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<!-- #ifdef MP-WEIXIN -->
							<button class="cu-btn bg-green margin-left" open-type="getPhoneNumber"
								@getphonenumber="getPhoneNumber">确定</button>
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appid: "wxb1c5d13732280bb4",
				secret: "811fca80f515f01628c177b26d98034a",
				session_key: '',
				type: 0,
				phone: "",
				phoneParams: {
					sessionkey: "",
					ivdata: "",
					encrypdata: ""
				},
				loginStatus: false,
				phoneStatus: false,
				modalName: null,

				logincode: '',
				encryptedData: '',
				rawData: {},
				iv: ''
			}
		},
		onLoad() {
			var Myuserid = uni.getStorageSync('Myuserid')
			// console.log(Myuserid)
		},
		onShow() {
			var that = this
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);
					that.logincode = loginRes.code
				},
				fail: function(loginRej) {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			});
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null;
				uni.showToast({
					icon: 'none',
					title: '您取消了授权！'
				})
			},
			wxGetUserInfo() {
				var that = this;
				// var logincode = this.login_code
				uni.getUserProfile({
					desc: 'weixin',
					success: function(infoRes) {
						console.log(infoRes, '个人信息');
						uni.setStorageSync('usertx', infoRes.userInfo.avatarUrl);
						uni.setStorageSync('username', infoRes.userInfo.nickName);
						
						that.rawData = infoRes.rawData
						uni.setStorageSync('userInfo', infoRes.userInfo);
						// uni.switchTab({
						// 	url: '/pages/index/index'
						// });
						that.getsessionkey()
					},
					fail: function(infoRej) {
						uni.switchTab({
							url: '/pages/index/index'
						});
					},
				});
			},



			// 获取sessionkey
			getsessionkey() {
				var that = this;
				// var data = {
				// 	codeObj: this.logincode,
				// 	ivObj: this.iv,
				// 	telObj: this.encryptedData,
				// 	rawData:this.rawData

				// }
				var data = {
					code: this.logincode,
					iv: this.iv,
					encryptedData: this.encryptedData,
					rawData: this.rawData,
					token: "login"
				}
				this.$myRequest({
					url: "wx/login",
					method: "POST",
					data: data,
					hideLoading: true,
				}).then(res => {
					console.log(res, '登录授权得到的值');
					// this.modalName = null;
					if (res.code == 200) {
						uni.setStorageSync('token', res.data.token)
						uni.setStorageSync('user_id', res.data.id)
						// uni.setStorageSync('userimg', res.data.headimgurl)
						// uni.setStorageSync('username', res.data.nickname)
						uni.setStorageSync('openid', res.data.openid)
						uni.setStorageSync('mobile', res.data.mobile);
						uni.setStorageSync('hytype', res.data.type);
						uni.setStorageSync('cardnum', res.data.sonnumber);
						uni.setStorageSync('integral', res.data.integral);
						uni.setStorageSync('session_key', encodeURIComponent(res.data.sessionKey))
						if (res.data.mobile == '') {
							that.modalName = 'DialogModal1';
							console.log('授权窗口');
						} else {
							that.modalName = 'DialogModal2';
							uni.switchTab({
								url: '../index/index'
							})
						}

					}

					// if (res) {
					// 	var session_key = res.data.session_key;
					// 	var openId = res.data.openid;
					// 	uni.setStorageSync('session_key', session_key)
					// 	uni.setStorageSync('openId', openId);
					// 	uni.setStorageSync('unId', res.data.unId);
					// 	uni.setStorageSync('Myuserid', res.data.userId);

					// 	if (res.data.userId != '') {
					// 		this.modalName = 'DialogModal1';
					// 	} else {
					// 		uni.switchTab({
					// 			url: '/pages/index/index'
					// 		});
					// 	}
					// }
				})
			},
			// 获取手机号
			getPhoneNumber(e) {
				// this.encryptedData = e.detail.encryptedData,
				// this.iv = e.detail.iv
				// this.getsessionkey()
				// var data = {
				// 	encryptedData: e.detail.encryptedData,
				// 	iv: e.detail.iv,
				// 	sessionKey: uni.getStorageSync('session_key'),
				// 	openId: uni.getStorageSync('openId'),
				// 	unId: uni.getStorageSync('unId'),
				// 	inviteRecord: uni.getStorageSync('inviteRecord') || '',
				// 	inviteNum: uni.getStorageSync('inviteNum') || ''
				// }
				// var session_key = 
				this.$myRequest({
					url: "wx/phone",
					method: "post",
					hideLoading: true,
					data: {
						"id": uni.getStorageSync('user_id'),
						"sessionKey": decodeURIComponent(uni.getStorageSync('session_key')),
						"encryptedData": e.detail.encryptedData,
						"iv": e.detail.iv
					},
				}).then(res => {
					console.log('获取手机号得到的值', res);
					if (res.phoneNumber != '') {
						uni.setStorageSync('mobile', res.phoneNumber);
						uni.switchTab({
							url: '../index/index'
						})
					}

				}).catch(rej => {

				})
			},
		}
	}
</script>

<style scoped>
	.header {
		margin: 90rpx 0 50rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.two-btn {
		padding: 30upx 80upx;
	}

	.shou-btn {
		width: 560upx;
		margin: 130upx auto;
		display: flex;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		/* border-radius: 50%; */
	}

	.header-mask {
		text-align: center;
		margin-bottom: 36upx;
	}

	.header-mask image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.content-c {
		margin-left: 50rpx;
		margin-bottom: 50rpx;
	}

	.content-c text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 35rpx 50rpx;
		font-size: 35rpx;
		background: #5cc78f;
		border: none;
	}

	.bottom:first-child {
		margin-top: 50rpx;
	}

	.view_input {
		margin: 0 50rpx;
		background-color: white;
		padding: 10px;
		height: 1rem;
		line-height: 1rem;
	}
</style>
