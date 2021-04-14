<template>
	<view class="shopcart">
		<!-- 购物车 -->
		<view class="cartBottom" @click="toggleList">
			<view class="padding-lr-lg w-100b flex align-center justify-between">
				<view class="iconBox bg-blue" :class="getAllCount ? 'active' : '' ">
					<text class="allcount" v-if="getAllCount">{{getAllCount}}</text>
					<image src="../../../static/images/cart.png" mode="" class="img"></image>
				</view>
				<view><text>￥</text><text class="font-40 font600">{{getAllPrice}}</text><text>元</text></view>
				<button class="cu-btn bg-blue round" @click.stop="shopresult">去结算</button>
			</view>
		</view>
		<!-- 选择的商品 -->
		<view class="cartList" v-show="isShowList && getList.length">
			<view class="title">
				<!-- <text>购物车</text> -->
				<view class="clear" @click="delShopcart">
					清空
				</view>
				<view class="clear" @click="toggleList">
					关闭
				</view>
			</view>
			<scroll-view scroll-y style="max-height: 400px;">
				<view class="list">
					<view class="list-text" v-for="(item,index) in getList" :key="index">
						<text class="text-left" style="flex:1">{{item.goods_name}}</text>
						<text style="flex:1">￥{{item.goods_amount}}</text>
						<cartcontrol :food="item" @add="addCart" @dec="decreaseCart"></cartcontrol>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="listMask" v-show="isShowList && getList.length" @click="toggleList"></view>
	</view>
</template>

<script>
	import cartcontrol from './cartcontrol.vue'
	export default {
		props: {
			goods: {
				type: Array
			}
		},
		data() {
			return {
				isShowList: false,
			};
		},
		components: {
			cartcontrol
		},
		computed: {
			getList() {
				let result = [];
				this.goods.forEach((good) => {
					good.treeList.forEach((food) => {
						if (food.counts) {
							result.push(food)
						}
					})
				})
				return result
			},
			// 获得购物车所有商品数量
			getAllCount() {
				let result = 0;
				this.getList.forEach((food) => {
					result += food.counts
				})
				return result
			},
			// 总价
			getAllPrice() {
				let result = 0;
				let result1 = 0;
				this.goods.forEach((good) => {
					good.treeList.forEach((food) => {
						result1 += this.accMul(food.counts, food.goods_amount)
						result = result1.toFixed(2);
					})
				})
				return result
			}
		},
		methods: {
			// 解决浮点数 运算出现多位小数
			accMul(arg1, arg2) {
				let m = 0,
					s1 = '',
					s2 = '';
				if (arg1 && arg1 != null)
					s1 = arg1.toString();
				if (arg2 && arg2 != null)
					s2 = arg2.toString();
				// console.log('m1',s2.replace('.',''))
				try {
					m += s1.split('.')[1].length
				} catch (e) {}
				try {
					m += s2.split('.')[1].length
				} catch (e) {}

				return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
			},
		

			toggleList() {
				if (this.getList.length) {
					this.isShowList = !this.isShowList;
				}
			},
			delShopcart() {
				var that= this;
				uni.showModal({
					title: '提示',
					content: '确定清空购物车吗？',
					success: function (res) {
						if (res.confirm) {
							that.isShowList = false;
							that.$emit('delAll');
						} else if (res.cancel) {
							that.isShowList = false;
						}
					}
				});
				
			},
			addCart: function(item) {
				this.$emit('add', item)
			},
			decreaseCart(item) {
				this.$emit('dec', item)
			},
			
			
			// 结算
			shopresult(){
				if(this.getList.length == 0){
					uni.showToast({
						icon:'none',
						title:'请先选择商品'
					})
					return false
				} else {
					var resultdata = {};
					resultdata.getAllPrice = this.getAllPrice;
					resultdata.getList = this.getList;
					console.log(resultdata);
					this.$emit("resultdata",resultdata);	
				}
				
			}	
				
		},
	}
</script>

<style scoped>
	.list-text {
		display: flex;
		flex-direction: row;
	}

	.shopcart .cartBottom {
		background: pink;
		position: fixed;
		bottom: -1upx;
		left: 0;
		right: 0;
		height: 100upx;
		z-index: 1999;
		display: flex;
		background-color: #FFFFFF;
		box-shadow: 0 -2upx 6upx rgba(0, 0, 0, 0.4);
	}
	.iconBox{
		position: relative;
		border-radius: 50%;
		width: 70upx;
		height: 70upx;
	}
	.allcount{
		position: absolute;
		right: -6px;
		top: 0;
		display: inline-block;
		padding: 0 6px;
		font-size: 9px;
		line-height: 16px;
		font-weight: 400;
		border-radius: 10px;
		background-color: #f01414;
		color: #ffffff;
	}
	.carIcon {
		flex: 1;
	}

	.img {
		font-size: 24px;
		line-height: 24px;
		width: 30px;
		height: 30px;
		padding-left: 6px;
		padding-top: 6px;
		color: #cccccc;
		border-radius: 50%;
	}


	.middle {
		display: flex;
		flex-direction: column;
		flex: 2;
		color: #ffffff;
	}

	.BtnRight {
		flex: 1;
	}

	.cartList {
		position: fixed;
		bottom: 54px;
		left: 0;
		right: 0;
		z-index: 1090;
	}

	.cartList .title,
	.cartList .list-text {
		display: flex;
		flex-direction: row;
	}

	.cartList .title {
		background: #F3F5F7;
		justify-content: space-between;
		padding: 30upx 30upx;
	}

	.cartList .list-text {
		padding: 10px 6px 10px 8px;
		text-align: center;
	}

	.list {
		background: #F8F8F8;
		padding-bottom: 10px;
	}


	/* 遮布 */
	.listMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1089;
		opacity: 0.5;
		background: #6a7076;
	}
</style>
