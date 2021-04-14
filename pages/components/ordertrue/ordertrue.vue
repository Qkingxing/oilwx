<template>
	<view class="paddinb-b100">
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">订单确认</block>
		</cu-custom>
		<view class="w-100b bg-fff">
			<view class="w-690">
				<view class="list h-100 border-b flex align-center justify-between">
					<view class="flex-sub flex align-center">
						<view class="label">支付方式</view>
						<view class="margin-left-xl">微信支付</view>
					</view>
					<view class="xyjt"></view>
				</view>
				<view class="list h-100 border-b flex align-center justify-between">
					<view class="flex-sub flex align-center">
						<view class="label">提货方式</view>
						<view class="margin-left-xl">自提</view>
					</view>
					<view class="xyjt"></view>
				</view>
				<view class="list h-100 border-b flex align-center justify-between">
					<view class="flex-sub flex align-center">
						<view class="label">提货油站</view>
						<view class="margin-left-xl">二环东路加油站</view>
					</view>
					<view class="xyjt"></view>
				</view>
			</view>
		</view>
		<view class="kong"></view>
		<view class="w-100b bg-fff">
			<view class="w-690 color-zdy font-34 padding-tb">商品列表</view>
			<view class="orderlist padding-tb w-100b" v-for="(item,index) in data" :key="index">
				<view class="w-690 flex justify-between">
					<image class="shopimg" :src="item.goods_cover" mode="widthFix"></image>
					<view class="shoptitle font-28">
						{{item.goods_name}}
					</view>
				</view>
				<view class="w-690 padding-top-sm flex align-center justify-between">
					<view>价格</view>
					<view>￥{{item.order_total/item.buy_count}}+{{item.integral/item.buy_count}}积分</view>
				</view>
				<view class="w-690 padding-xs">
					<text class="font-28">共{{item.buy_count}}件商品 总金额：</text>
					<text class="font-26"></text>
					<text class="color-red font-36 font500">￥{{item.order_total}}+{{item.integral}}积分</text>
				</view>

			</view>
		</view>
		<view class="bottom bg-fff h-100 flex justify-between align-center w-100b">
			<view class="left padding-left-xl color-red font-36"><text class="color-A5 font-28">总价</text><text class="font-28">￥</text>{{order_total_count}}<text class="font-28">+</text>{{integral_count}}<text class="font-28">积分</text></view>
			<view class="bg-zdy h-100 color-fff font-34 flex align-center flex-sub justify-center" @tap.stop="gobuy">去支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(opt) {
			console.log(opt)
			this.id = opt.id;
			this.zf_number = opt.zf_number;
			this.getdefault(opt.id);
			// this.TowerSwiper('swiperList');
		},
		data() {
			return {
				data:[],
				integral_count:0,
				order_total_count:0
			}
			
		},
		methods: {
			getdefault(id) {
				var data = {
				    "user_id": uni.getStorageSync('user_id'),
				    "id":id
				}
				this.$myRequest({
					url: "customer/query_product_order",
					method: "POST",
					data: data, 
					type:'',
					hideLoading: true,
				}).then(res => {
					if(res.code == 200){
						this.data = res.data;
						this.integral_count = res.data[0].integral_count;
						this.order_total_count = res.data[0].order_total_count;
					}
				})
			},
			gobuy(){
				var datas = {
				    "zf_number": this.zf_number
				}
				this.$myRequest({
					url: "wxPay/ceshi_order",
					method: "POST",
					data: datas, 
					type:'',
					hideLoading: true,
				}).then(res => {
					if(res.code == 200){
						console.log(1231231231);
					}
				})
			}
				
			
		}
	}
</script>

<style scoped>
	page{
		background: #F0F0F0;
	}
.xyjt {
    width: 14upx;
    height: 14upx;
    border-top: 1px solid #040A46;
    border-right: 1px solid #040A46;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-left: 15px;
}
.list:nth-last-child(1){
	border-bottom: none;
}
.kong{
	width: 100%;
	height: 20upx;
	background: #F0F0F0;
}
.shopimg{
	width: 160upx;
}
.shoptitle{
	padding-left: 30upx;
	padding-right: 40upx;
	width:70%;
}
.bottom{
	position: fixed;
	left:0;
	bottom: 0;
	z-index: 999;
}
.bottom .left{
	width: 450upx;
}
</style>
