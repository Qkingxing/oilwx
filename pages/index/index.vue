<template name="Index">
	<view class="paddinb-b100">
		<cu-custom bgColor="bg-top-zdy" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">首页</block>
		</cu-custom>
		<view class="w-100b">
			<view class="w-690">
				<view class="padding-tb-sm flex align-center justify-start">
					<text class="text-gray cuIcon-location"></text>
					<view class="margin-left-sm">{{site_name}}</view>
				</view>
				<view class="padding-tb-sm flex justify-between">
					<view class="flex-sub text-center" v-for="(item,index) in origin" :key="index" @tap="tlick(index)">
						<image class="originimg" :src="item.imgsrc" mode=""></image>
						<view>{{item.title}}</view>
					</view>
				</view>
				<!-- <image class="banner" src="../../static/images/banner.png" mode="widthFix"></image> -->
				<image class="banner" src="http://m.qpic.cn/psc?/V14RYZIk1PYmVh/TmEUgtj9EK6.7V8ajmQrEAGYZKGKWIQI6EB63kl9nLp7EHNHjjbr9mRH9UfVZwLsWUkGYBwV2xIYjtu7l4JAEn4yHdyGd7TTO4hQQVBmkDw!/b&bo=*AN9AQAAAAADN5E!&rf=viewer_4"
				 mode="widthFix"></image>
				<view class="LIst">
					<view class="title-icon">
						<view class="cuIcon-titles color-zdy"></view>
						<view class="font-32 font600">油卡特惠专区</view>
					</view>
					<view>
						<scroll-view class="tab-scroll-view" scroll-x="true" @scroll="scroll">
							<view class="tab-item" v-for="(item,index) in schop" :key="index">
								<image :src="item.card_style" mode="widthFix"></image>
								<!-- <view class="sheng-out">
									<image src="../../static/images/tuan-icon.png" mode=""></image>
									<view class="sheng-text font-26 color-green">可省{{item.smoney}}元</view>
								</view> -->
								<view class="color-red price font-38"><text class="font-24">{{item.card_name}}</text></view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<cuxian></cuxian>
		<!-- <view class="w-100b">
			<view class="w-690">
				<view class="title-icon">
					<view class="cuIcon-titles color-zdy"></view>
					<view class="font-32 font600">爆款返券专区</view>
				</view>
				<view class="flex align-center justify-between">
					<view class="w-330 bao-list" v-for="(item,index) in baolist" :key="index">
						<view class="bao-inner">
							<image :src="item.baoimg" mode="widthFix"></image>
							<text class="font-28">{{item.baotext}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<cuxian></cuxian> -->
		<view class="w-100b">
			<view class="w-690">
				<view class="title-icon">
					<view class="cuIcon-titles color-zdy"></view>
					<view class="font-32 font600">优惠精品屋</view>
				</view>
				<view class="">
					<view class="shoplist padding-tb border-b flex justify-between" v-for="(item,index) in shoplist" :key="index">
						<image class="listimg" :src="item.goods_cover" mode=""></image>
						<view class="w-450 margin-left">
							<view class="ccyc">{{item.goods_name}}</view>
							<view class="padding-tb-sm">已团{{item.goods_sold}}件</view>
							<view class="flex justify-between align-center margin-top-sm">
								<view class="color-red font-32"><text class="font-20"></text></view>
								<button class="cu-btn bg-green" @tap="godetail(item.id)">马上抢</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Index",
		data() {
			return {
				lon:'',
				lat:'',
				location: '',
				site_name:'',
				origin: [{
					imgsrc: '../../static/images/three1.png',
					title: '扫一扫'
				}, {
					imgsrc: '../../static/images/three2.png',
					title: '油客云闪付'
				}, {
					imgsrc: '../../static/images/three3.png',
					title: '会员码'
				}],
				schop: [{
					card_style: '../../static/images/youlogo.png',
					card_name: '50',
					price: '100'
				}],
				shoplist: [{
					imgsrc: '../../static/images/youlogo.png',
					tit: '油站优惠500',
					num: '58',
					price: '188',
				}, {
					imgsrc: '../../static/images/youlogo.png',
					tit: '油站优惠1000',
					num: '58',
					price: '188',
				}, {
					imgsrc: '../../static/images/youlogo.png',
					tit: '油站优惠2500',
					num: '58',
					price: '188',
				}],
				baolist: [{
					baoimg: '../../static/images/bao1.png',
					baotext: '购物送油专区'
				}, {
					baoimg: '../../static/images/bao2.png',
					baotext: '购水送油专区'
				}],
				pubilcImg:{
					imgsrc: '../../static/images/youlogo.png',
				}
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getlocation()
			
		},
		methods: {
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			godetail(item) {
				// console.log(item)
				uni.navigateTo({
					url: '../components/shopdetail/shopdetail?id='+item
				})
			},
			// 三个按钮
			tlick(idex) {
				console.log(uni.getStorageSync('openid'));
				if(uni.getStorageSync('openid') != ''){
					if (idex == 0) {
						let that = this;
						// 只允许通过相机扫码
						uni.scanCode({
							onlyFromCamera: true,
							success: function(res) {
								console.log(res);
							}
						});
					} else if (idex == 1) {
						uni.navigateTo({
							url:'../components/shanpay/shanpay'
						})
					} else if (idex == 2) {
						// uni.navigateTo({
						// 	url: '../login/wx_login'
						// })
						uni.navigateTo({
							url:`../components/ewm/ewm`
						})
					}
				} else {
					uni.navigateTo({
						url:'../login/wx_login'
					})
				}
				
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
						var reg = /.+?(省|市|自治区|自治州|县|区)/g;
						var addresspos = res[0].regeocodeData.formatted_address;
						that.addressList = addresspos.match(reg).toString().split(",");
						that.location = addresspos.replace(that.addressList[0],"");	
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
				var data = {
				     latitude:lat,
					 longitude:lon
				    }
				this.$myRequest({
					url: "work/get_latitude_longitude",
					method: "POST",
					data: data, 
					type:'php',
					hideLoading: true,
				}).then(res => {
					console.log(res, '获取定位');
					if(res.code == 200){
						this.site_name = res.data.site_name
						// uni.setStorageSync('token',res.data.token)
						this.site_id = res.data.id
						uni.setStorageSync('group_id',res.data.group_id)
						uni.setStorageSync('site_id',res.data.id)
						if(uni.getStorageSync('openid') != ''){
							this.gettoken(res.data.id,res.data.group_id);
						}
						
					}
				})
			},
			// 获取最新token
			gettoken(site_id,group_id){
				var data = {
				     site_id:site_id,
					 group_id:group_id,
					 user_id:uni.getStorageSync('user_id'),
				    }
					console.log(data);
				this.$myRequest({
					url: "work/userGetToken",
					method: "POST",
					data: data, 
					type:'php',
					hideLoading: true,
				}).then(res => {
					console.log(res, '1111');
					if(res.code == 200){
						uni.setStorageSync('token',res.data)
						this.getyujpw();
					}
				})
			},
			getyujpw(){
				//加油卡
				var data = {
				  //    site_id:site_id,
					 // group_id:group_id,
					 // user_id:uni.getStorageSync('user_id'),
				}
				console.log(data);
				this.$myRequest({
					url: "user/gasfillingcardlist",
					method: "POST",
					data: data, 
					type:'php',
					hideLoading: true,
				}).then(res => {
					console.log(res, '1111');
					if(res.code == 200){
						this.schop = res.data.data;
					}
				})
				//获取优惠券列表
				var datas = {
					"limit":3,
					"page":1,
					"goods_type":1,
					"site_id":this.site_id,
					"state":1
				}
				console.log(data);
				this.$myRequest({
					url: "goods/getManagement",
					method: "POST",
					data: datas, 
					type:'',
					hideLoading: true,
				}).then(res => {
					// console.log(res, '1111');
					if(res.code == 200){
						this.shoplist = res.data;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.originimg {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}

	.banner {
		width: 100%;
		height: 200upx;
		border-radius: 10upx;
	}

	.title-icon {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 20upx 0;
	}

	.title-icon .icon {
		width: 6upx;
		height: 12upx;
		border-radius: 4upx;
	}

	.tab-scroll-view {
		width: 100%;
		height: auto;
		flex-direction: row;
		white-space: nowrap;
	}

	.tab-item {
		display: inline-block;
		width: 240upx;
		/* height: 284rpx; */
		font-size: 16px;
		color: #555;
		padding: 5px;
		/* border: 1px solid yellow; */
	}

	.tab-item:nth-last-child(1) {
		margin-right: 0;
	}

	.w-330 {
		width: 330upx;
	}

	.w-330 image {
		width: 100%;
		height: 260upx;
	}

	.listimg {
		width: 200upx;
		height: 200upx;
		border-radius: 12upx;
	}

	.w-450 {
		width: 450upx;
	}

	.shoplist:nth-last-child(1) {
		border-bottom: none;
	}

	.shoplist:nth-child(1) {
		padding-top: 0;
	}

	.sheng-out {
		position: relative;
	}

	.sheng-out image {
		width: 80%;
		height: 42upx;
		position: absolute;
		top: 0;
		left: 10%;
		z-index: 1;
	}

	.sheng-text {
		position: absolute;
		top: 0;
		right: 10%;
		z-index: 2;
		line-height: 42upx;
		padding-right: 20upx;
	}

	.price {
		/* margin-top: 60upx;
		margin-left: 30upx; */
		white-space: nowrap;      /*超出的空白区域不换行*/
		overflow: hidden;         /*超出隐藏*/
		text-overflow: ellipsis;  /*文本超出显示省略号*/
	}

	.bao-list {
		height: 140upx;
	}

	.bao-inner image {
		position: absolute;
		left: 0;
		top: 0;
		height: 160upx;
		z-index: 2;
	}

	.bao-inner text {
		position: absolute;
		left: 30upx;
		top: 30upx;
		z-index: 5;
	}

	.bao-inner {
		position: relative;
	}
</style>
