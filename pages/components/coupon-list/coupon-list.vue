<template>
	<view class="paddinb-b100">
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">优惠券</block>
		</cu-custom>
		<view class="w-100b">
			<view class="w-690">
				<view class="list font-30 flex align-center justify-between" v-for="(item,index) in couparr" :key="index" @tap="coupon(item,index)">
					<view class="flex align-center justify-start">
						<image class="icon" :src="item.icon" mode="widthFix"></image>
						<view>{{item.name}}</view>
					</view>
					<view class="flex align-center justify-between">
						<text>{{item.num}}张</text>
						<view class="xyjt"></view>
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
				couparr:[{
					icon:'../../../static/images/coup1.png',
					name:'优惠券',
					num:0,
				},{
					icon:'../../../static/images/coup2.png',
					name:'折扣券',
					num:4,
				},{
					icon:'../../../static/images/coup3.png',
					name:'洗车券',
					num:9,
				}]
			}
		},
		methods: {
			coupon(item,idex){
				console.log(item)
				uni.navigateTo({
					url:`./coupon?name=${item.name}&type=${idex}`
				})
			}
		}
	}
</script>

<style scoped>
.list{
	height: 110upx;
	border-bottom: 2upx solid #F0F0F0;
}
.list .icon{
	width: 42upx;
	margin-right: 30upx;
}
.xyjt{
	width: 14upx;
	height: 14upx;
	border-top: 2upx solid #040A46;
	border-right: 2upx solid #040A46;
	transform: rotate(45deg);
	margin-left: 30upx;
}
</style>
