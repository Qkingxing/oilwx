<template>
	<view class="padding-b100">
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">商品详情</block>
		</cu-custom>
		<view class="w-100b">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			<view class="w-690">
				<view class="flex align-start margin-top">
					<view class="ccyc0 font-28">{{data.goods_name}}</view>
				</view>
				<view class="color-A5 font-26 flex justify-between margin-tb-sm">
					<view>已团{{data.goods_sold}}件</view>
					<!-- <view>
						<text class="lg cuIcon-share"></text>
						<text>分享</text>
					</view> -->
				</view>
				<view class="color-red font-36"><text class="font-24">￥：</text>{{data.goods_amount}}+<text class="font-24">积分：</text>{{data.integral}}</view>
				<view class="font-26 flex  margin-top-sm justify-between">
					<view class="flex-sub">适用油站</view>
					<view class="color-A5 syyz ccyc">{{data.site_id}}</view>
				</view>
			</view>
			<view class="w-690 ">
				
				<view class="margin-top">详情</view>
				<view class="contss margin-top">{{data.goods_introduce}}</view>
				
			<!-- 	<image class="imgdeta" v-for="(item,index) in imgarr" :key="index" :src="item" mode="widthFix"></image> -->
			</view>
		</view>
		
		<view class="bottom h-100 flex justify-between align-center w-100b">
			<view class="w-690 flex-sub">
				<view class="flex-sub h-100 flex  justify-between align-center">
					<view class="color-red font-36">
						<text class="font-24">￥：</text>{{data.goods_amount}} +
						<text class="font-24"> 积分：</text>{{data.integral}}
					</view>
				</view>
			</view>
			
			<view class="flex-sub h-100 text-center font-34 font600 bg-zdy flex align-center justify-center color-fff" 			@tap="showModal" data-target="bottomModal">马上抢</view>
			<!-- <view class="flex-sub h-100 text-center font-34
 font600 bg-zdy flex align-center justify-center color-fff" @tap="showModal"
			 data-target="bottomModal">马上抢</view> -->
		</view>
		
		
		
		
		
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="padding-sm">
					<view class="flex justify-between">
						
						<image class="imgst" :src="data.goods_cover" mode="widthFix"></image>
						<view class="padding-left text-left flex-sub">
							<view class="font-30">{{data.goods_name}}</view>
							<view class="color-red font-36">
								<text class="font-24">￥：</text>{{data.goods_amount}} +
								<text class="font-24"> 积分：</text>{{data.integral}}
							</view>
						</view>
					</view>
					<view class="flex justify-between align-center padding-tb-sm">
						<view>数量</view>
						<view style="display: flex;flex-direction: row;height: 27px;">
							<view class="food-control">
								<view class="cont" style="margin-top: 2px;" @tap.stop="decreaseCart">
									<image src="../../../static/images/sub.png" mode="" style="width: 20px;height: 20px;"></image>
								</view>
								<text style="padding: 0 4px;font-size: 30upx;margin-top: 6upx;">{{count}}</text>
							</view>
							<view style="flex: 1;margin-top: 2px; " class="cont" @tap.stop="addCart">
								<image src="../../../static/images/add.png" style="width: 20px;height: 20px;color: #CCCCCC;" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-sub h-100 text-center font-34 font600 bg-zdy flex align-center justify-center color-fff"
				 @tap.stop="gobuy">马上抢</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cartcontrol from '../../../colorui/components/shop/cartcontrol.vue'
	export default {
		components: {
			cartcontrol
		},
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				imgarr: ['http://m.qpic.cn/psc?/V14RYZIk1PYmVh/TmEUgtj9EK6.7V8ajmQrEN5bPpGFGon47bjxB6SXACsBkbUbuFwQRztVdyNV5b3Hd8hOGiW2uPRvj6LVHFGJ.LMLtLVhVZgQiGEBRa2IUfw!/b&bo=LAEsAQAAAAADFzI!&rf=viewer_4', 'http://m.qpic.cn/psc?/V14RYZIk1PYmVh/TmEUgtj9EK6.7V8ajmQrEN5bPpGFGon47bjxB6SXACsBkbUbuFwQRztVdyNV5b3Hd8hOGiW2uPRvj6LVHFGJ.LMLtLVhVZgQiGEBRa2IUfw!/b&bo=LAEsAQAAAAADFzI!&rf=viewer_4',
					'http://m.qpic.cn/psc?/V14RYZIk1PYmVh/TmEUgtj9EK6.7V8ajmQrEN5bPpGFGon47bjxB6SXACsBkbUbuFwQRztVdyNV5b3Hd8hOGiW2uPRvj6LVHFGJ.LMLtLVhVZgQiGEBRa2IUfw!/b&bo=LAEsAQAAAAADFzI!&rf=viewer_4'
				],
				data:{},
				modalName: null,
				count: 1
			}
		},
		onLoad(opt) {
			this.id = opt.id;
			this.getdefault(opt.id);
			this.TowerSwiper('swiperList');
			
			// this.id = options.id;
			// this.getdefault(options.id);
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			//获取商品详情
			getdefault(id){
				console.log(123123)
				var data = {
					id:id
				}
				var that = this
				this.$myRequest({
					url: "/shop/productDetails",
					method: "POST",
					data: data, 
					type:'php',
					hideLoading: true,
				}).then(res => {
					if(res.code == 200){
						that.data = res.data;
						var swiperData = res.data["goods_cover"].split(",");
						var swiperList = [];
						for (let i = 0; i < swiperData.length; i++) {
							var item = {};
							item.type = 'image'
							item.id = i;
							item.url = swiperData[i];
							swiperList.push(item)
						}
						that.swiperList = swiperList;
						console.log(swiperData[0])
						that.data.goods_cover = swiperData[0];
					}
				})
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			addCart: function() {
				this.count += 1
			},
			decreaseCart(item) {
				if (this.count <= 1) {
					return
				} else {
					this.count -= 1
				}
			},
			gobuy() {
				var data = {
				    "user_id": uni.getStorageSync('user_id'),
				    "treeList": [{
				        "buy_count": this.count,
				        "product_id": this.id
				    }]
				}
				var old = uni.getStorageSync('integral');
				if(old==null||old==""||old==undefined){
					old = 0;
				}
				var news = this.data.integral*this.count
				if(old<news){
					wx.showToast({
						title: '当前积分不足！',
						success: function(res) {
							
						},
					})
					return false;
				}
				this.$myRequest({
					url: "customer/add_product_order",
					method: "POST",
					data: data, 
					type:'',
					hideLoading: true,
				}).then(res => {
					if(res.code == 200){
						wx.showToast({
							title: '支付成功！',
							success: function(res) {
								setTimeout(function(){
									uni.navigateTo({
										url: '../ordertrue/ordertrue?id='+res.data.id+"&zf_number="+res.data.zf_number
									})
								},2000)
							},
						})
					}
				})
				
				
			}
		}
	}
</script>

<style scoped>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.contss{
		width:100%;
		
	}
	.ccyc0 {
		line-clamp: 2;
	}

	.syyz {
		width: 560upx;
	}

	.imgdeta {
		width: 100%;
		font-size: 0;
		line-height: 0;
		display: block;
	}

	.bottom {
		height: 100upx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		background: #FFFFFF;
	}

	.h-100 {
		height: 100upx;
	}

	.bott-icon {
		width: 32upx;
		display: block;
		margin: auto
	}

	.imgst {
		width: 200upx;
	}

	.food-control {
		display: flex;
		flex: 1;
		justify-content: space-around;
	}

	.cont {
		width: 22px;
		height: 22px;
		box-sizing: border-box;
		border-radius: 50%;
		text-align: center;
	}
</style>
