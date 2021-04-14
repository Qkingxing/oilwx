<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">商城</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-blue round">搜索</button>
			</view>
		</view>

		<view class="content">
			<scroll-view class="menu-wrapper" scroll-y :scroll-top="left_scroll" scroll-with-animation="true">
				<view class="left-content">
					<view style="position: relative;" v-for="(item,index) in goods" :key="index" ref="menuList"
						@click="select(index)" :class="{'current': currentIndex == index}">
						<view class="menu-item">{{item.goods_name}}</view>
						<text class="allcount" v-if="getAllCount>=item.counts&&item.counts>0">{{item.counts}}</text>
					</view>
				</view>
			</scroll-view>
			<!-- 右侧滚动 -->
			<scroll-view class="foods-wrapper" scroll-y :style="'height:'+windows_height - 50 +'px'"
				:scroll-top="foodSTop" @scroll="myscroll" scroll-with-animation="true">
				<view ref="foodsWrapper">
					<view ref="foodList" class="foods" v-for="(item, i) in goods" :key="i">
						<view class="food-title" style="background: #f3f5f7">
							{{item.goods_name}}
						</view>
						<view class="food" v-for="(food, index) in item.treeList" :key="index">
							<image :src="food.goods_cover" mode="" style="width: 75px;height: 75px;margin-top: 6px;">
							</image>
							<view class="food-info">
								<text style="font-size: 15px;margin-top: 2px;">{{food.goods_name}}</text>
								<text style="font-size: 13px;margin: 2px 0;">{{food.goods_introduce}}</text>
								<text style="font-size: 13px;margin: 2px 0 4px;">剩余{{food.count}}</text>
								<!-- 加减 -->
								<view class="food-btm">
									<text class="food-price">￥{{food.goods_amount}}</text>
									<cartcontrol :food="food" @add="addCart" @dec="decreaseCart"></cartcontrol>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<shopcart :goods="goods" @add="addCart" @dec="decreaseCart" @delAll="delAll" @resultdata="resultdata"></shopcart>
		</view>
	</view>
</template>

<script>
	import shopcart from '../../colorui/components/shop/shopcart.vue';
	// 数量选择
	import cartcontrol from '../../colorui/components/shop/cartcontrol.vue';
	import Vue from 'vue'

	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				title: 'Hello',
				goods: [],
				
				windows_height: 0, //屏幕高度
				foodSTop: 0, //右侧的滑动值
				currentIndex: 0,

				last: 0,
				right_height: [], //右侧每个内容的高度集合
				select_index: 0,
				left_height: 0, //左侧总高度
				left_scroll: 0, //左侧滑动值
				catrgoryList: [],
				timeout: null
			}

		},
		components: {
			shopcart,
			cartcontrol
		},
		onLoad() {
			this.windows_height = Number(uni.getSystemInfoSync().windowHeight) - 55;
			setTimeout(() => {
				this.getHeightList();
			}, 1000)
		},
		onShow() {
			this.getshop()
		},

		computed: {
			getList() {
				let result = [];
				// console.log(this.goods,'数组');
				this.goods.forEach((good) => {
					// console.log(good,'第一层');
					good.treeList.forEach((food) => {
						// console.log(food,'第二层');
						if (food.counts) {
							result.push(food)
						}
					})
				})
				// console.log('result', result);
				return result
			},
			// 获得购物车所有商品数量
			getAllCount: function(item) {
				// console.log('111111111进来了');
				let result = [];
				let counts = 0;
				for (let i = 0; i < this.goods.length; i++) {
					counts = 0;
					this.goods[i].treeList.forEach((food) => {
						// console.log(food);
						if (food.counts >= 0) {
							counts += food.counts
							Vue.set(this.goods[i], 'counts', counts)
						}
					})
					result.push(counts)
				}

				result.sort(function(a, b) {
					return a - b;
				})
				counts = result[result.length - 1]
				return counts;
			},

		},
		methods: {
			getshop() {
				console.log('进来了');
				var data = {
					"site_id": uni.getStorageSync('site_id') //站点id
				}
				// var that = this;
				this.$myRequest({
					url: "customer/query_goods_list",
					method: "POST",
					data: data,
					hideLoading: true,
				}).then(res => {
					console.log(res, '商品');
					// this.modalName = null;
					if (res.code == 200) {
						this.goods = res.data;
					}
				})
			},
			// 点击侧边栏
			select(index) {
				this.currentIndex = index;
				this.setScrollH(index);
			},

			// 设置点击侧边栏右边滚动的高度
			setScrollH(index) {
				var that = this;
				var height = 0;
				var query = uni.createSelectorQuery();
				let foods = query.selectAll('.foods');
				console.log(foods, '----');
				this.$nextTick(function() {
					foods.fields({
						size: true
					}, data => {
						if (index == 0) {
							that.foodSTop = 0;
						}
						for (let i = 0; i < index; i++) {
							height += parseInt(data[i].height);
							// console.log('fh', foods);
							that.foodSTop = height;
							// console.log(that.foodSTop)
						}

					}).exec();
				})

			},
			// 增加
			addCart: function(item) {
				console.log(this.goods);
				if (item.counts >= 0) {
					item.counts++
					this.goods.forEach((good) => {
						good.treeList.forEach((food) => {
							// 根据名字添加购物车,实际环境根据需要更改
							if (item.goods_name == food.goods_name)
								food.counts = item.counts
						})
					})
				} else {
					console.log('add')
					this.goods.forEach((good) => {
						good.treeList.forEach((food) => {
							if (item.goods_name == food.goods_name)
								Vue.set(food, 'counts', 1)
						})
					})
				}
			},
			// 减少
			decreaseCart(item) {
				if (item.counts) {
					item.counts--
					this.goods.forEach((good) => {
						good.treeList.forEach((food) => {
							if (item.goods_name == food.goods_name)
								food.counts = item.counts
						})
					})
				}
			},
			// 清空购物车
			delAll() {
				this.goods.forEach((good) => {
					good.treeList.forEach((food) => {
						if (food.counts) {
							food.counts = 0
						}
					})
				})
			},
			// 购物结算
			resultdata(e){
				console.log(e);
				var newarr = []
				var getAllPrice = e.getAllPrice
				var getList = e.getList
				getList.forEach((item) => {
					newarr.buy_count = item.counts;
					newarr.product_id = item.id;
				})
				
				var data = {
					"user_id": uni.getStorageSync('user_id'),
					"treeList":getList
					
				}
				console.log(data)
				// var that = this;
				this.$myRequest({
					url: "customer/add_product_order",
					method: "POST",
					data: data,
					hideLoading: true,
				}).then(res => {
					console.log(res, '商品');
					// this.modalName = null;
					if (res.code == 200) {
						this.goods = res.data;
					}
				})
			},
			getHeightList() {
				let _this = this;
				let selectorQuery = uni.createSelectorQuery().in(this);
				selectorQuery.select('.left-content').boundingClientRect(function(rects) {
					_this.left_height = rects.height;
				});
				selectorQuery.selectAll('.foods').boundingClientRect(function(rects) {
					_this.right_height = rects.map((item) => item.top);
				}).exec();
			},
			myscroll(e) {
				//引入节流	
				let right_content_height = e.detail.scrollHeight - this.windows_height;
				if (right_content_height == e.detail.scrollTop) {
					return;
				}
				let scroll_top = e.detail.scrollTop + 110; //110是banner图的高度
				//判断当前的scrollTop在哪个区间内;
				let now = +new Date();
				if (now - this.last > 100) {
					this.last = now;
					let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top &&
						scroll_top < arr[
							index + 1]);
					this.currentIndex = active_index;
					if (this.left_height - this.windows_height) {
						//如果有超出部分
						let diff = this.left_height - this.windows_height
						this.left_scroll = Math.round((active_index * diff) / (this.goods.length - 1))
					}
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		position: absolute;
		top: 230upx;
		bottom: 110upx;
		width: 100%;
		overflow: hidden;
	}

	.current {
		position: relative;
		z-index: 0;
		background-color: #fff;
		color: #7C7EE2;
		border-left: 5px solid #7C7EE2;
	}

	.menu-wrapper {
		text-align: center;
		width: 22%;
		display: flex;
		flex-direction: column;
		background: #f3f5f7;

	}

	.menu-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
	}

	.allcount {
		position: absolute;
		right: 6px;
		top: 8px;
		display: inline-block;
		padding: 0 4px;
		font-size: 9px;
		line-height: 16px;
		font-weight: 400;
		border-radius: 50%;
		background-color: #f01414;
		color: #ffffff;
	}

	.foods-wrapper {
		margin-left: 4px;
		width: 78%;
	}

	.food,
	.food-btm,
	.content {
		display: flex;
		flex-direction: row;
	}

	.food-title {
		padding: 2px 0;
	}

	.food-info {
		margin-left: 10px;
		margin-right: 16px;
		display: flex;
		flex-direction: column;
		flex: 2;
	}

	.food-btm {
		justify-content: space-between;
	}

	.food-price {
		color: #f01414;
		font-size: 16px;
	}
</style>
