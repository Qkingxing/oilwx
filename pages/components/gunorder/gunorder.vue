<template>
	<view >
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">下订单</block>
		</cu-custom>
		<view>
			<!-- <view class="list" v-for="(item,index) in orderlist" :key="index"> -->
			<view class="list">
				<view class="w-690">
					<view class="margin-top padding radius shadow bg-white">
						<view class="flex justify-between">
							<view>订单编号：</view>
							<view>{{orderlist.zf_number}}</view>
						</view>
					</view>
					<view class="">
						<view class="padding-tb-sm">油品</view>
						<view class="padding-lr radius shadow bg-white">
							<view class="flex justify-between padding-tb border-b" v-show="type==1">
								<view>枪号：</view>
								<view>{{orderlist.oils_gunName}}</view>
							</view>
							<view class="flex justify-between padding-tb border-b">
								<view>油品：</view>
								<view>{{orderlist.oils_name}}</view>
							</view>
							<view class="flex justify-between padding-tb border-b">
								<view>油价：</view>
								<view>{{orderlist.oils_money}}</view>
							</view>
							<view class="flex justify-between padding-tb border-b">
								<view>升数：</view>
								<view>{{orderlist.order_liter}}L</view>
							</view>
							
						</view>
					</view>
					<view class="">
						<view class="padding-tb-sm">选择优惠券</view>
						<view class="padding-lr radius shadow bg-white">
							<view class="flex justify-between padding-tb border-b">
								<view>优惠券：</view>
								<view class="quan-right flex align-center flex-end text-right">
									<view>暂无优惠券可用</view>
									<view class="quan-jt"></view>
								</view>
								
							</view>
						</view>
					</view>
					<view class="">
						<view class="padding-tb-sm">优惠</view>
						<view class="padding-lr radius shadow bg-white">
							<view class="flex justify-between padding-tb border-b">
								<view>应缴金额：</view>
								<view>{{orderlist.original_amount}}</view>
							</view>
							<view class="flex justify-between padding-tb border-b">
								<view>单升优惠：</view>
								<view>{{orderlist.liter_discount}}</view>
							</view>
							<view class="flex justify-between padding-tb border-b">
								<view>单升优惠金额：</view>
								<view>{{orderlist.oils_discount}}</view>
							</view>
							<view class="flex justify-between padding-tb border-b">
								<view>优惠券优惠：</view>
								<view>{{orderlist.coupon_discount}}</view>
							</view>
							<view class="flex justify-between padding-tb border-b">
								<view>总优惠：</view>
								<view>{{orderlist.count_discount}}</view>
							</view>
							<view class="flex justify-between padding-tb border-b">
								<view>实缴金额：</view>
								<view>{{orderlist.actually_paid}}</view>
							</view>
						</view>
					</view>
				</view>
				<button class="cu-btn bg-blue s-btn lg" @tap="ordertrue()">去支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				type:'',
				orderlist:{}
			}
		},
		onLoad(options) {
			this.id = options.id
			this.type = options.type
			// 油品或者油枪订单列表
			this.oilorder()
			console.log(uni.getStorageInfoSync('userid'));
		},
		onShow() {
			// this.getquan()
		},
		methods: {
			oilorder() {
				var data = {
					id:this.id
				}
				this.$myRequest({
					url: "order/pos_get_rder",
					method: "POST",
					data: data,
					type: '',
					hideLoading: true,
				}).then(res => {
					console.log(res, '订单列表');
					if (res.code == 200) {
						this.orderlist = res.data[0]
						this.getquan()
					}
				})
			},
			getquan(){
				// console.log(this.orderlist);
				var data = {
				    "user_id":uni.getStorageSync('user_id'),
				    "zf_number":this.orderlist.zf_number,
				};
				this.$myRequest({
					url: "order/posUpdateAccounts",
					method: "POST",
					data: data,
					type: '',
					hideLoading: true,
				}).then(res => {
					console.log(res, '优惠券');
					if (res.code == 200) {
						// this.orderlist = res.data
					}
				})
			},
			ordertrue(){
				//微信正式接口
				// var data = {
				// 	openid:uni.getStorageSync('openid'),
				// 	number:this.orderlist.zf_number,
				// 	appid:"wxb1c5d13732280bb4",
				// 	amount:this.orderlist.actually_paid*100
				// }
				// this.$myRequest({
				// 	url: "wxPay/getCodeUrl",
				// 	method: "POST",
				// 	data: data,
				// 	type: '',
				// 	hideLoading: true,
				// }).then(res => {
				// 	console.log(res, '订单支付');
				// 	// if (res.code == 200) {
				// 	// 	// this.orderlist = res.data
				// 	// 	let data = res.data;
				// 	// 	this.wxpayfun(data)
				// 	// }
				// 	this.wxpayfun(res)
				// })
				
				var data = {
				    "zf_number":this.orderlist.zf_number,
				}
				this.$myRequest({
					url: "wxPay/ceshi_order",
					method: "POST",
					data: data,
					type: '',
					hideLoading: true,
				}).then(res => {
					
					wx.showToast({
						title: '支付成功！',
						success: function(res) {
							
						},
					})
				})
			},
			// 拉起支付
			wxpayfun(data){
				console.log('进来了');
				
				
				wx.requestPayment({
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.package,
					signType: data.signType,
					paySign: data.paySign,
					success: function(res) {
						console.log(res,'1qaz');
						wx.showToast({
							title: '支付成功！',
							success: function(res) {
								
							},
						})
					},
					fail(e) {
						// wx.navigateBack({
						// 	delta: 1
						// })
					},
					complete() {
						
					}
				})
			}
		},
	}
</script>

<style >
page{
	background: #F5F5F5;
}
.list{
	width: 100%;
	/* border-bottom: 20upx solid #ccc; */
	padding-bottom: 30upx;
}
.quan-jt{
	width: 14upx;
	height: 14upx;
	border-top: 2px solid #9c9b9b;
	border-right: 2px solid #9c9b9b;
	transform: rotate(45deg);
	margin-left: 30upx;
}
.quan-right{
	width: 50%;
}
.s-btn{
	width: 680upx;
	display: flex;
	margin: 80upx auto;
}
</style>
