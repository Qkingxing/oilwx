<template name="User">
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">个人中心</block>
		</cu-custom>
		<view>
			<view class="bgtop">
				<image class="bgimg" src="../../static/images/my_bg.png" mode="widthFix"></image>
				<block v-if="openid != ''">
					<view class="bgcon  flex justify-start">
						<image class="user-tx" :src="userimg"></image>
						<view class=" margin-left color-fff">
							<view class="">
								<text class="font-40 margin-right-sm">{{username}}</text>
								<image class="vip" src="../../static/images/V.png" mode="widthFix"></image>
							</view>
							<view v-if="cardnum != ''" class="font-26 margin-top-sm">ID:{{cardnum}}</view>
						</view>
					</view>
					<text class="setting color-fff cuIcon-settings" @tap="setting"></text>
				</block>
				<block v-else>
					<view class="gologin" @tap="gologin">
						<image src="../../static/images/user.png" mode=""></image>
						<text>去登录</text>
					</view>
				</block>
				<view class="chang">
					<view class="chang-out">
						<image class="chang-bg" src="../../static/images/bg-chang.png" mode="widthFix"></image>
						<view class="chang-con flex align-center justify-between">
							<view class="flex-sub text-center" @tap="mycoupon">
								<view class="font-34 font600 padding-bottom-xs">4</view>
								<view>优惠券</view>
							</view>
							<view class="shuxian"></view>
							<view class="flex-sub text-center" @tap="mycoupon">
								<view class="font-34 font600 padding-bottom-xs">5</view>
								<view>加油卡</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="w-100b border-b">
				<view class="padding-tb w-690">
					<view class="font-32 font600">我的订单</view>
					<view class="orderout flex justify-between align-center padding-top">
						<view class="orderlist" v-for="(item,index) in orderlist" :key="index" @tap="ordertypes(index,item)">
							<image class="ordericon" :src="'../../static/images/order' + index + '.png'" mode="widthFix"></image>
							<view class="margin-top-xs">{{item}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="w-100b">
				<view class="padding-tb w-690">
					<view class="font-32 font600">我的服务</view>
					<view class="orderout flex justify-start flex-wrap align-center ">
						<view class="orderlist margin-top" v-for="(item,index) in fwlist" :key="index" @tap="service(index)">
							<image class="ordericon" :src="'../../static/images/fu' + index + '.png'" mode="widthFix"></image>
							<view class="margin-top-xs">{{item}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"User",
		data() {
			return {
				userimg:'',
				username:'',
				cardnum:'',
				orderlist:['全部','待支付','待提货','已完成'],
				fwlist:['发票抬头','车辆监管','附近油站','今日油价','设置','开票记录'],
				openid:''
			}
		},
		onLoad() {
			this.openid = uni.getStorageSync('openid')
		},
		onShow() {
			this.userimg = uni.getStorageSync('usertx')
			this.username = uni.getStorageSync('username')
			this.cardnum = uni.getStorageSync('cardnum')
			// this.getmess()
		},
		methods: {
			mycoupon(){
				this.gologin()
				uni.navigateTo({
					url:'../components/coupon-list/coupon-list'
				})
			},
			// mycomecard(){
			// 	uni.navigateTo({
			// 		url:'../components/comecard/comecard'
			// 	})
			// },
			setting(){
				this.gologin()
				uni.navigateTo({
					url:'../components/seting/seting'
				})
			},
			ordertypes(idex,item){
				this.gologin()
				let tabindex = idex
				uni.navigateTo({
					url:`../components/oeder/oeder?tabindex=${tabindex}`
				})
			},
			service(index){
				this.gologin()
				if(index == 0) {
					// 发票抬头
					uni.navigateTo({
						url:'../components/invoicelist/invoicelist'
					})
					
				} else if(index == 1){
					// 车辆监管
					uni.navigateTo({
						url:'../components/carlist/carlist'
					})
				} else if(index == 2){
					// 附近油站
					uni.navigateTo({
						url:'../components/station/station'
					})
				} else if(index == 3){
					// 今日油价
					uni.navigateTo({
						url:'../components/you-price/you-price'
					})
				} else if(index == 4){
					// 设置
					this.setting()
				} else if(index == 5){
					// 开票记录
					
				}
			},
			getmess(){
				let datas = {
					
				}
				this.$myRequest({
					url: "order/getOrder",
					method: "POST",
					type: '',
					data: datas,
					hideLoading: true,
				}).then((res) => {
					console.log(res,'订单');
					if (res.code == 200) {
						
				
				
					} else {
				
					}
				}).catch((rej) => {
				
				})
			},
			gologin(){
				if(this.openid == ''){
					uni.reLaunch({
						url:'../login/wx_login'
					})
				} else {
					return
				}
				
				
				
			}
		}
	}
</script>

<style scoped>
.bgtop{
	position: relative;
	height: 460upx;
}
.bgimg{
	width: 100%;
	position: absolute;
	left:0upx;
	top:0upx;
	z-index: 1;
}
.bgcon{
	position: absolute;
	left:30upx;
	top:60upx;
	z-index: 2;
}
.gologin{
	position: absolute;
	left:30upx;
	top:60upx;
	z-index: 2;
	color: #fff;
	font-size: 38upx;
	display: flex;
	align-items: center;
}
.gologin image{
	width: 90upx;
	height: 90upx;
}
.gologin text{
	color: #FFFFFF;
	font-size: 38upx;
	display: block;
	margin-left: 36upx;
}
.setting{
	position: absolute;
	z-index: 6;
	right: 10upx;
	top:20upx;
	font-size: 40upx;
	padding:40upx;
}
.vip{
	width: 36upx;
}
.user-tx{
	width: 110upx;
	height: 110upx;
	border-radius: 50%;
}
.chang{
	width: 100%;
	position: absolute;
	left:0upx;
	top:240upx;
	z-index: 3;
}
.chang-out{
	position: relative;
}
.chang-bg{
	width: 100%;
	position: absolute;
	left:0;
	top:0;
	z-index: 5;
}
.chang-con{
	width: 100%;
	position: absolute;
	left:0;
	top:0;
	z-index: 6;
	height: 220upx;
}
.shuxian{
	width: 2upx;
	height: 60upx;
	background: #E9EAEF;
}
.orderout{
	
}
.orderlist{
	width: 25%;
	text-align: center;
}
.ordericon{
	width: 40upx;
	
}
.border-b{
	border-bottom: 10upx solid #F0F0F0;
}

</style>
