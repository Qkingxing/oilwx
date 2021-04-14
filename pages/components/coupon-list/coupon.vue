<template>
	<view class="paddinb-b100">
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="w-100b">
			<scroll-view class="bg-white nav top-nav" :style="[{top:CustomBar + 'px'}]">
				<view class="flex text-center">
					<view class="cu-item flex-sub" v-for="(item,index) in topnav" :key="index" @tap="tabSelect" :data-id="index">
						<view :class="index==TabCur?'topcur color-zdy':''">
							{{item.name}}({{item.num}})
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="w-690" :style="[{'margin-top':CustomBar + 'px'}]">
				<view class="couplist font-30 flex align-center justify-between" v-for="(item,index) in couplist" :key="index">
					<view class=" coupinner flex align-center justify-between">
						<view class="couleft color-fff text-center">
							<view class="margin-top font500 font-34"><text class="font-26">￥</text>{{item.price}}</view>
							<view class="margin-top-sm font-26">满{{item.man}}元可用</view>
						</view>
						<view class="couright padding-left-sm">
							<view class="padding-sm">
								<view class="font-32 font600">{{item.title}}</view>
								<view class="font-24 padding-tb-sm">{{item.time1}}至{{item.time2}}</view>
								<view class="btn-out text-center color-green font-22">
									<text class="lg cuIcon-location"></text>
									<text>导航</text>
								</view>
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
		data() {
			return {
				title:'',
				type:'',
				TabCur: 0,
				scrollLeft: 0,
				topnav:[{
					name:'未使用',
					num:0,
				},{
					name:'已使用',
					num:4,
				},{
					name:'已过期',
					num:9,
				}],
				couplist:[{
					price:'50',
					man:'10',
					title:'汽车服务券',
					time1:'2020.12.20',
					time2:'2021.12.20'
				},{
					price:'20',
					man:'14',
					title:'汽车服务券',
					time1:'2020.12.20',
					time2:'2021.12.20'
				},{
					price:'30',
					man:'19',
					title:'汽车服务券',
					time1:'2020.12.20',
					time2:'2021.12.20'
				}],
			}
		},
		onLoad(option) {
			this.title = option.name
			this.type = option.type
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
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
	.couplist{
		padding:20upx 0;
		border-bottom: 2upx solid #F0F0F0;
	}
	.coupinner{
		border-radius: 12upx;
		height: 190upx;
	}
	.couleft{
		position: relative;
		background: #13CFA0;
		width: 220upx;
		height: 190upx;
	}
	.couleft::before{
		content: ' ';
		width: 0;
		height: 100%;
		position: absolute;

		/* 小球形状 */
		border-right: 6px dotted white;
		right: -3px;
		top: 0px;
	}
	.couright{
		width: 470upx;
		height: 190upx;
	}
	.btn-out{
		width: 120upx;
		padding:6upx 0;
		border-radius: 28upx;
		border:2upx solid #13CFA0;
	}
</style>
