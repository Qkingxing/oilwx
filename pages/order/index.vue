<template name="Order">
	<view class="paddinb-b100">
		<cu-custom bgColor="bg-top-zdy" :isBack="isback">
			<block slot="backText"></block>
			<block slot="content">油品订单</block>
		</cu-custom>
		<view class="w-100b">
			<view :style="[{top:CustomBar + 'px'}]" class="w-100b bg-fff top-nav flex justify-between">
				<view class="bg-white nav  flex-sub" >
					<view class="flex text-center">
						<view class="cu-item flex-sub" v-for="(item,index) in topnav" :key="index" @tap="tabSelect" :data-id="index">
							<view :class="index==TabCur?'topcur color-zdy':''">
								{{item}}
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="search-out flex align-center justify-end" @tap="showModal" data-target="topModal">
					<image class="shu" src="../../static/images/shu.png" mode="widthFix"></image>
					<image class="search" src="../../static/images/otab.png" mode="widthFix"></image>
				</view> -->
			</view>
			
			<view :style="[{'margin-top':CustomBar + 'px'}]">
				<view class="orderlist padding-tb w-100b" v-for="(item,index) in orderlist" :key="index" @tap="jump(item)">
					<view class="w-690">
						<view class="flex justify-between align-center">
							<view class="font-30">{{item.zf_number}}</view>
							<view class="wxicon-out  flex justify-between align-center">
								<image src="../../static/images/wx.png" mode="widthFix"></image>
								<view class="color-green">交易成功</view>
							</view>
						</view>
						<view class="flex padding-top-sm justify-between">
							<image class="shopimg" :src="item.shopimg||`../../static/youlogo.png`" mode="widthFix"></image>
							<view class="margin-left flex-sub">
								<view class="flex justify-between">
									<view class="font-32 font600">{{item.oils_name}}</view>
									<view class="color-red">￥{{item.order_total}}</view>
								</view>
								<view class="flex color-A5 padding-tb-sm justify-between">
									<view>升数</view>
									<view>{{item.order_liter}}升</view>
								</view>
								<view class="text-left color-A5">{{item.transaction_time}}</view>
							</view>
						</view>
						<view class="flex justify-between">
							<view class="padding-top-sm text-right">
								<text class="font-28">优惠金额:</text>
								<text class="font-24 font500">￥</text>
								<text class="font-38 font500 color-red">{{item.count_discount}}</text>
							</view>
							<view class="padding-top-sm text-right">
								<text class="font-28">实际支付:</text>
								<text class="font-24 font500">￥</text>
								<text class="font-38 font500 color-red">{{item.actually_paid}}</text>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部弹窗 -->
		<view :style="[{'margin-top':CustomBar  + 'px'}]" class="cu-modal top-modal" :class="modalName=='topModal'?'show':''"  @tap="hideModal">
			<view class="cu-dialog">
				
				<view class="padding-xl">
					Modal 内容。
				</view>
				<view class="cu-bar bg-white font-34 flex text-center ">
					<view class="flex-sub h-100 color-333 flex justify-center align-center" @tap="hideModal">取消</view>
					<view class="flex-sub h-100 color-fff bg-zdy flex justify-center align-center" @tap.stop="istrue">确定</view>	
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: "Order",
		data() {
			return {
				CustomBar:this.CustomBar,
				TabCur: 0,
				scrollLeft: 0,
				modalName: null,
				topnav: ['今天', '本周', '本月'],
				orderlist: [{
					num: '564513212154',
					type: '1',
					shopimg: '../../static/images/youlogo.png',
					name: '测试订单',
					price: '563',
					position: '二环东路加油站',
					unit: '45',
					date: '2020/12/03  19:20',
					allprice:'888'
				}, {
					num: '564513212154',
					type: '1',
					shopimg: '../../static/images/youlogo.png',
					name: '测试订单',
					price: '563',
					position: '二环东路加油站',
					unit: '45',
					date: '2020/12/03  19:20',
					allprice:'888'
				}, {
					num: '564513212154',
					type: '1',
					shopimg: '../../static/images/youlogo.png',
					name: '测试订单',
					price: '563',
					position: '二环东路加油站',
					unit: '45',
					date: '2020/12/03  19:20',
					allprice:'888'
				}, {
					num: '564513212154',
					type: '1',
					shopimg: '../../static/images/youlogo.png',
					name: '测试订单',
					price: '563',
					position: '二环东路加油站',
					unit: '45',
					date: '2020/12/03  19:20',
					allprice:'888'
				}],
				isback:false,
				page:1,
				limit:6
			}
		},
		onLoad(option) {
			console.log(option.isback)
			this.isback = option.isback
		},
		onShow() {
			this.getorder()
		},
		methods: {
			jump(a){
				var id = a.id;
				uni.navigateTo({
					url:`../components/oildetail/oildetail?id=${id}`
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.getorder()
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 点击确定
			istrue(){
				console.log(111);
			},
			getorder(){
				var count = 0;
				if(Number(this.TabCur) + 1==1){
					count = 1;
				}else if(Number(this.TabCur) + 1==2){
					count = 3;
				}else if(Number(this.TabCur) + 1==3){
					count = 4
				}
				let datas = {
					page:this.page,
					limit:this.limit,
					time_type:count,
					user_id:uni.getStorageSync('user_id'),
					product_type:1
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
						this.orderlist = res.data;
						this.orderlist.forEach((item) => {
							item.shopimg = item.imgpath||"../../static/images/youlogo.png"
						})
					} 
				}).catch((rej) => {
				
				})
			}	
		}
	}
</script>

<style scoped>
	.topcur {
		border-bottom: 3px solid #7C7EE2;
		display: inline-block;
		padding: 0 10upx;
	}
	.top-nav{
		position: fixed;
		z-index: 999;
		left:0;
	}

	.nav .cu-item {
		line-height: 80upx;
	}

	.orderlist {
		border-top: 10upx solid #f0f0f0;
	}

	.wxicon-out {
		width: 160upx;
	}

	.wxicon-out image {
		width: 36upx;
	}

	.shopimg {
		width: 150upx;
		height: 150upx;
	}
	.search-out{
		width: 100upx;
	}
	.search-out .shu{
		height: 90upx;
		width: 16upx;
	}
	.search-out .search{
		width: 56upx;
		margin:20upx;
	}
</style>
