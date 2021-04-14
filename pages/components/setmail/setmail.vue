<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">设置邮箱</block>
		</cu-custom>
		<view>
			<view class="cu-form-group margin-top border-b">
				<view class="title">邮箱</view>
				<input placeholder="请输入您的邮箱" v-model="email" name="input"></input>
			</view>
			<button class="w-690 flex justify-center email-btn cu-btn bg-blue lg" @tap="truebtn">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: ''
			}
		},
		onLoad(options) {
			
			this.email = options.email
		},
		methods: {
			truebtn() {
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (reg.test(this.email != true)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确邮箱地址'
					})
					return
				}
				var datas = {
					id: uni.getStorageSync('user_id'), //用户id 必传
					sex: "", //性别 非必传
					mobile: "", //手机号 非必传
					nickname: "",//昵称//非必传
					headimgurl: "", //头像 非必传
					plate_number: "",//车牌号 非必传
					email: this.email //邮箱 非必传
				}
				this.$myRequest({
					url: "customer/update_user_list",
					method: "POST",
					data: datas,
					type: '',
					hideLoading: true,
				}).then(res => {
					console.log(res, '1111');
					if (res.code == 200) {
						uni.navigateBack({
							delta: -1
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F5F5F5;
	}

	.email-btn {
		margin-top: 200upx
	}
</style>
