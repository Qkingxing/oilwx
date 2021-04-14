<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="content">会员码</block>
		</cu-custom>
		<view class="ewm-outer">
			<view class="ewm-bg  radius shadow-warp">
				<view class="left-yuan"></view>
				<view class="right-yuan"></view>
				<view class="ewm-top border-b flex padding align-center flex-start">
					<image :src="userimg" mode=""></image>
					<view class="padding-left">
						<view class="font600">{{username}}</view>
						<view>{{tellphone}}</view>
					</view>
				</view>
				<view class="ewm-bottom">
					<view class="qrimg">
					    <tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "../../../common/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {tkiQrcode},
		data() {
			return {
				userimg:'',
				username:'',
				tellphone:'',
				// 设置二维码
				ifShow: true,
				val: '', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: '#ffffff', // 背景色
				foreground: '#000000', // 前景色
				pdground: '', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		onLoad() {
			var tel = uni.getStorageSync('mobile')
			tel = "" + tel;
			this.tellphone = tel.substr(0,3) + "****" + tel.substr(7)
			
			this.userimg = uni.getStorageSync('userimg')
			this.username = uni.getStorageSync('username')
			this.val = uni.getStorageSync('user_id')
		},
		onShow() {
			
		},
		methods: {
			qrR(res) {
				this.src = res
			},
		}
	}
</script>

<style scoped>
page{
	background-color: #F5F5F5;
}
.ewm-outer{
	margin-top:120upx;
}
.ewm-bg{
	position: relative;
	width: 580upx;
	margin:auto;
	overflow: hidden;
}
.ewm-top image{
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
}
.ewm-bottom{
	/* height: 500upx; */
	/* background: pink; */
}
.left-yuan,.right-yuan{
	width: 24upx;
	height: 24upx;
	background: #FFFFFF;
	border-radius: 50%;
	position: absolute;
	z-index: 66;
	border:1upx solid #F0F0F0;
}
.left-yuan{
	left:-10upx;
	top:128upx;
	
}
.right-yuan{
	right:-10upx;
	top:128upx;
}
.container {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.qrimg {
	display: flex;
	justify-content: center;
	padding-top: 88upx;
	padding-bottom: 88upx;
}
.qrimg-i{
	margin-right: 10px;
}

.shadow-warp:before, .shadow-warp:after{
	position: relative!important;
}



.btns {
	display: flex;
	flex-direction: column;
	width: 100%;
}


</style>
