<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">今日油价</block>
		</cu-custom>
		<view class="padding-b100">
			<view class="">
				<view>
					<view class="w-690 text-center">
						<image class="you-bg margin-tb-xl" src="../../../static/images/you-price.png" mode="widthFix">
						</image>
					</view>
			
					<view>
						<view v-for="(item,index) in youarr" :key="index">
							<view class="flex justify-center padding-tb-sm">
								<view class="flex1 text-right">{{item.oils_name}}</view>
								<view class="colorbg" :style="{'background':item.bg}"></view>
								<view class="flex1 font600 font-38">
									<text class="font-28 font600">￥</text>{{item.oils_money}}<text
										class="font-30 font400">元/升</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="text-center font600 font-38 padding-tb-xl">最终油价以油站挂牌价为准</view>
			<view class="text-center font-28 color-A5">成为会员价格更优惠哦！</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				// navarr: ['今日油价(山东)', '政府指导价'],
				youarr: []
			}
		},
		onLoad() {
			this.getyou()
		},
		methods: {
			// tabSelect(e) {
			// 	this.TabCur = e.currentTarget.dataset.id;
			// 	this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			// },
			getyou() {
				let datas = {
					site_id: uni.getStorageSync('site_id'),
					oils_status: 1
				}
				this.$myRequest({
					url: "set/siteoillist",
					method: "POST",
					type: 'php',
					data: datas,
					hideLoading: true,
				}).then((res) => {
					console.log(res);
					if (res.code == 200) {
						// this.youarr = res.data.data
						
						var lsdata = res.data.data;
						lsdata.forEach((item) => {
							var R = Math.floor(Math.random() * 255);
							var G = Math.floor(Math.random() * 255);
							var B = Math.floor(Math.random() * 255);
							item.bg = 'rgb(' + R + ',' + G + ',' + B + ')'
						})
						this.youarr = lsdata
						
						// background: 'rgb(' + R + ',' + G + ',' + B + ')'


					} else {

					}
				}).catch((rej) => {

				})
			}
		}
	}
</script>

<style scoped>
	.border-nav {
		border-bottom: 6upx solid #7C7EE2 !important;
	}

	.you-bg {
		width: 250upx;
	}

	.colorbg {
		width: 26upx;
		height: 40upx;
		margin: 0 20upx;
	}
	.padding-b100{
		padding-bottom: 100upx;
	}
</style>
