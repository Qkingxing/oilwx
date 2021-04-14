<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">闪付</block>
		</cu-custom>
		<view class="">
			<view class="flex padding justify-between">
				<view>您在:{{site_name}}</view>
				<view class="choose-pay flex align-center">
					<image src="../../../static/images/wx_pay.png" mode=""></image>
					<text>微信支付</text>
				</view>
			</view>
			<view class="w-690  padding bg-fff radius-12">
				<view class="font-30 font600">{{gun_status == 1 ? '选择油枪':'选择油品'}}</view>
				<view class=" flex justify-start flex-wrap">
					<view class="list-li margin-top margin-right" v-for="(item,index) in gunlist" :key="index">
						<button class="cu-btn round " :class="select == index?'bg-blue':'bg-ccc'" @tap="gunclick(index,item)">
							<block v-if="gun_status == 1">{{item.gun_name}}</block>
							<block v-else>{{item.oils_name}}</block>
						</button>
					</view>
				</view>
			</view>
			<view class="w-690  padding bg-fff radius-12">
				<view class="font-30 font600">金额</view>
				<view class="search-form margin-top round">
					<input type="text" v-model="oil_num" placeholder="加油总金额" readonly="readonly"></input>
				</view>
			</view>
		</view>
		<view :style="{'margin-top': (gun_status == 1 ? '90px':'40px')}">
			<button class="cu-btn pay-btn lg bg-blue"  @tap="gopay">确 定</button>
		</view>
		
		<!-- <view class="fu-content">
			<view class="border-b padding-lr-lg margin-top">
				<view class="font600 font-32">枪号</view>
				<view class="list flex justify-between padding-tb">
					<image src="../../../static/images/jyz.png" mode=""></image>
					<input class="flex1 padding-lr" type="text" placeholder="请输入枪号">
				</view>
			</view>
			<view class="border-b padding-lr-lg margin-top">
				<view class="font600 font-32">金额</view>
				<view class="list flex justify-between padding-tb">
					<image src="../../../static/images/money.png" mode=""></image>
					<input class="flex1 padding-lr" type="text" placeholder="请输入金额">
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				site_name: '',
				gun_id: '',
				gunlist: [],
				select: '-1',
				idexitem:'',
				gun_status:'',
				oil_num:''
			}
		},
		onLoad() {

		},
		onShow() {
			this.getstationyq()
		},
		methods: {
			getstationyq() {
				var data = {

				}
				this.$myRequest({
					url: "set/guntypeget",
					method: "POST",
					data: data,
					type: 'php',
					hideLoading: true,
				}).then(res => {
					console.log(res,'909090');
					if (res.code == 200) {
						// this.site_name = res.data.site_name
						// this.gun_id = res.data.id
						this.gun_status = res.data.gun_status
						//这里判断该油站是否开启油枪
						if (res.data.gun_status == 1) {//开启油枪
							this.oilgun()
						} else {//未开启油枪
							this.oillist()
						}
					}
				})
			},
			// 油枪列表
			oilgun() {
				var data = {
				}
				this.$myRequest({
					url: "set/gunlist",
					method: "POST",
					data: data,
					type: 'php',
					hideLoading: true,
				}).then(res => {
					console.log(res, '油枪列表');
					if (res.code == 200) {
						this.gunlist = res.data.data
						// this.oilorder()
					}
				})
			},
			// 油品列表
			oillist() {
				var data = {}
				this.$myRequest({
					url: "set/siteoillist",
					method: "POST",
					data: data,
					type: 'php',
					hideLoading: true,
				}).then(res => {
					// console.log(res,'优品');
					if (res.code == 200) {
						this.gunlist = res.data.data
						// this.oilorder()
					}
				})
			},
			
			gunclick(idex,item) {
				this.select = idex;
				this.idexitem = this.gun_status == 1? item.id : item.id;
				console.log(this.gun_status);
				console.log(item);
				this.getOrder()
			},
			getOrder(){
				var data = {
					 
				}
				if(this.gun_status==1){
					data.oils_gunId=this.idexitem;
				}else{
					data.oils_id=this.idexitem;
				}
					
				console.log(data);
				this.$myRequest({
					url: "order/pos_get_rder",
					method: "POST",
					data: data,
					type: '',
					hideLoading: true,
				}).then(res => {
					console.log(res, '1233');
					if (res.code == 200) {
						if(res.data.length<=0){
							uni.showToast({
							    title: '暂无订单，请等待',
							    duration: 2000
							});
						}else{
							this.order0 = res.data[0];
							this.oil_num = res.data[0].order_total+"元";
						}
					}
				})
			},
			gopay(){
				if(this.idexitem == ''){
					uni.showToast({
						icon:'none',
						title:'请选择订单'
					})
					return
				}
				var data = {
					user_id:uni.getStorageSync('user_id'),
					zf_number:this.order0.zf_number
				}
				
				this.$myRequest({
					url: "order/pos_liter_discount",
					method: "POST",
					data: data,
					type: '',
					hideLoading: true,
				}).then(res => {
					if (res.code == 200) {
						var datas = {
							"settlement":"2",
							"zf_number":this.order0.zf_number
						}
						this.$myRequest({
							url: "order/posUpdateOrder",
							method: "POST",
							data: datas,
							type: '',
							hideLoading: true,
						}).then(res => {
							if(res.code==200){
								var idss = this.order0.id;
								var type = this.gun_status;
								uni.navigateTo({
									url:`../gunorder/gunorder?id=${idss}&type=${type}`
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F5F5F5 !important;
	}

	.fu-content {}

	.fu-content image {
		width: 40upx;
		height: 40upx;
	}

	.choose-pay {}

	.choose-pay image {
		width: 30upx;
		height: 30upx;
	}

	.gunlist {}

	.bg-ccc {
		background: #CCCCCC;
	}
	.search-form input{
		height: 80upx;
		padding:0upx 30upx;
		border:1upx solid #CCCCCC;
		background: #F5F5F5;
		border-radius: 10upx;
	}
	.pay-btn{
		width: 560upx;
		display: flex;
		margin: auto;
	}
</style>
