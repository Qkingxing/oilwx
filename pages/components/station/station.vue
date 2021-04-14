<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">附近油站</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入加油站名" confirm-type="search" @input="searchIcon"></input>
			</view>
		</view>
		<view :style="[{'margin-top':CustomBar  + 'px'}]" class="margin-bottom-xl">
			<view class="w-100b bg-fff padding-top margin-top-sm" v-for="(item,index) in station" :key="index" @tap="stationlist">
				<view class="w-100b border-b">
					<view class="w-690 flex justify-between padding-tb-sm">
						<image class="tx" :src="item.img" mode="widthFix"></image>
						<view class="padding-left">
							<view class="color-333 font-32 ccyc">{{item.site_name}}</view>
							<view class="color-A5 font-28">{{item.address}}</view>
							<!-- <view class="color-A5 font-28">电话:{{item.tell}}</view> -->
						</view>
					</view>
				</view>
				<view class="w-100b flex align-center justify-between dh padding-tb-sm ">
					<view class="flex-sub text-center">
						<image src="../../../static/images/shan.png" mode="widthFix"></image>
						<text>闪付</text>
					</view>
					<view class="flex-sub text-center" style="border-left: 2px solid #a0a0a0;">
						<image src="../../../static/images/daohang.png" mode="widthFix"></image>
						<text>导航</text>
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
				station:[],
				lat:'',
				lon:''
			}
		},
		onLoad() {
			this.getlocation()
		},
		onShow() {
			
		},
		methods: {
			getlocation(){
				var that = this;
				var myAmapFun = new that.$amap.AMapWX({
					key: that.$base.gd_key
				});
				myAmapFun.getRegeo({
					success: function(res) {
						console.log(res);
						var reg = /.+?(省|市|自治区|自治州|县|区)/g;
						var addresspos = res[0].regeocodeData.formatted_address;
						// that.addressList = addresspos.match(reg).toString().split(",");
						// that.location = addresspos.replace(that.addressList[0],"");	
						that.lat = res[0].latitude;
						that.lon = res[0].longitude;
						that.getsite(that.lat,that.lon)
					},
					fail: function(rej) {
						// console.log(rej)
					}
				})
			},
			getsite(lat,lon){
				let datas = {
					latitude:lat,
					longitude:lon
				}
				this.$myRequest({
					url: "work/get_latitude_longitudes",
					method: "POST",
					type: 'php',
					data: datas,
					hideLoading: true,
				}).then((res) => {
					console.log(res,'列表');
					if (res.code == 200) {
						
						let lsdata = res.data
						lsdata.forEach((item) =>{
							item.img = "../../../static/images/youlogo.png"
							// var lnglatXY = [item., 39.992706];
							// var myAmapFun = new that.$amap.AMapWX({
							// 	key: that.$base.gd_key
							// });
							// myAmapFun.getAddress(lnglatXY, function(status, result) { 
							// 	if(status === 'complete' && result.info === 'OK') { 
							// 	geocoder_CallBack(result); 
							// 	} 
							// }); 
						})
						console.log(lsdata);
						this.station = lsdata;
					} else {
				
					}
				}).catch((rej) => {
				
				})
			}
		}
	}
</script>

<style scoped>
page{
	background: #F5F5F5;
}
.tx{
	width: 50upx;
	height: 50upx;
}
.dh{
	
}
.dh image{
	width: 32upx;
	height: 32upx;
	margin-right: 20upx;
	display: inline-block;
	vertical-align: text-top;
}

</style>
