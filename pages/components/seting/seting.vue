<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">个人设置</block>
		</cu-custom>
		<view class="w-100b bg-fff">
			<view class="w-690 font-32 border-b">
				<view class="flex align-center justify-between padding-tb">
					<view>头像</view>
					<image class="tx" :src="userimg" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<view class="w-100b bg-fff ">
			<view class="w-690 font-32">
				<view class="flex align-center justify-between padding-tb border-b">
					<view>名字</view>
					<view>{{username}}</view>
				</view>
				<view class="flex align-center justify-between padding-tb border-b">
					<view>更换手机号</view>
					<view class="flex align-center">
						<view>{{phone}}</view>
						<view class="xyjt"></view>
					</view>
				</view>
				<view class="flex align-center justify-between padding-tb border-b" @tap="myewm">
					<view>我的二维码</view>
					<view class="flex align-center">
						<text class="lg  font-40 cuIcon-qr_code"></text>
						<view class="xyjt"></view>
					</view>
				</view>
				<view class="flex align-center justify-between padding-tb border-b" @tap="setemail">
					<view>邮箱地址</view>
					<view class="flex align-center">
						<view>{{email}}</view>
						<view class="xyjt"></view>
					</view>
				</view>
				<view v-if="hytype == 3" class="flex align-center justify-between padding-tb border-b">
					<view>会员卡号</view>
					<view>{{cardnum}}</view>
				</view>
				<view class="flex align-center justify-between padding-tb border-b">
					<view>支付密码</view>
					<view class="flex align-center">
						<view>关闭</view>
						<view class="xyjt"></view>
					</view>
				</view>
				<view class="flex align-center justify-between padding-tb" @tap="gaddress">
					<view>收货地址</view>
					<view class="flex align-center">
						<view>{{address}}</view>
						<view class="xyjt"></view>
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
				userimg: '',
				username: '',
				phone: '',
				cardnum: '',
				hytype: '',
				email:'',
				address:""
			}
		},
		onLoad() {
			this.phone = uni.getStorageSync('mobile')
			this.userimg = uni.getStorageSync('usertx')
			this.username = uni.getStorageSync('username')
			this.cardnum = uni.getStorageSync('cardnum')
			this.hytype = uni.getStorageSync('hytype')
		},
		onShow() {
			this.getmess()
		},
		methods: {
			// 我的二维码
			myewm() {
				uni.navigateTo({
					url: '../ewm/ewm'
				})
			},
			// 设置邮箱
			setemail() {
				var email = this.email
				uni.navigateTo({
					url: `../setmail/setmail?email=${email}`,
					
				})
			},
			// 收货地址
			gaddress() {
				var address = this.address
				uni.navigateTo({
					url: `../gaddress/gaddress?address=${address}`
				})
			},
			getmess() {
				let datas = {
					user_id:uni.getStorageSync('user_id')
				}
				this.$myRequest({
					url: "user/checkUseInfo",
					method: "POST",
					type: 'php',
					data: datas,
					hideLoading: true,
				}).then((res) => {
					console.log(res, '12');
					if (res.code == 200) {
						this.email = res.data.email;
						this.address = res.data.address;

					} else {

					}
				}).catch((rej) => {

				})
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F5F5F5;
	}

	.tx {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}

	.xyjt {
		width: 12upx;
		height: 12upx;
		border-top: 2upx solid #040A46;
		border-right: 2upx solid #040A46;
		transform: rotate(45deg);
		margin-left: 20upx;
	}
</style>
