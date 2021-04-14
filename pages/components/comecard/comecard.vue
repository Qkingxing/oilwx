<template>
	<view class="paddinb-b100">
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">加油卡</block>
		</cu-custom>
		<view class="w-100b">
			<view class="w-690">
				<view class="list flex align-center justify-between" v-for="(item,index) in couparr" :key="index">
					<image class="icon" :src="item.icon" mode="widthFix"></image>
					<view>{{item.name}}</view>
					<view>
						<text>{{item.num}}</text>
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
					icon:'../../../static/images/coup1.png',
					name:'折扣券',
					num:4,
				},{
					icon:'../../../static/images/coup1.png',
					name:'洗车券',
					num:9,
				}]
			}
		},
		methods: {
			
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
	width: 12upx;
	height: 12upx;
	border-top: 2upx solid #040A46;
	border-right: 2upx solid #040A46;
	transform: rotate(45deg);
}
</style>
