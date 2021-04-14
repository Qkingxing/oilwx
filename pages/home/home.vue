<template>
	<view>
		<Index v-if="PageCur=='Index'"></Index>
		<Shop v-if="PageCur=='Shop'"></Shop>
		<Order v-if="PageCur=='Order'"></Order>
		<User v-if="PageCur=='User'"></User>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="Index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/Index' + [PageCur=='Index'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='Index'?'color-zdy':'tab-text-no'">加油</view>
			</view>
			<view class="action" @click="NavChange" data-cur="Shop">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/Shop' + [PageCur == 'Shop'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='Shop'?'color-zdy':'tab-text-no'">商城</view>
			</view>
			<view class="action" @click="NavChange" data-cur="Order">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/Order' + [PageCur == 'Order'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='Order'?'color-zdy':'tab-text-no'">订单</view>
			</view>
			<view class="action" @click="NavChange" data-cur="User">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/User' + [PageCur == 'User'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='User'?'color-zdy':'tab-text-no'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'Index',
				data1:{
					lat:'',
					lon:''
				}
			}
		},
		onLoad() {
			console.log('1111')
			this.getlocation()
		},
		onShow() {
			console.log('22222')
			// this.getlocation()
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			getlocation(){
				var that = this;
				console.log(that.$base,'0000');
				var myAmapFun = new that.$amap.AMapWX({
					key: that.$base.gd_key
				});
				myAmapFun.getRegeo({
					success: function(res) {
						console.log(res);
						// var reg = /.+?(省|市|自治区|自治州|县|区)/g;
						// var addresspos = res[0].regeocodeData.formatted_address;
						// that.addressList = addresspos.match(reg).toString().split(",");
						// that.location = addresspos.replace(that.addressList[0],"");	
						that.lat = res[0].latitude;
						that.lon = res[0].longitude;
					},
					fail: function(rej) {
						// console.log(rej)
					}
				})
			}
			
		}
	}
</script>

<style scoped>

</style>
