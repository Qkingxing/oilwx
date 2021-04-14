<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">收货地址</block>
		</cu-custom>
		<view class="w-690" v-if="isshow">
			<view class="no-data">
				<image src="../../../static/images/zwsj.png" mode=""></image>
				<view class="font-32 margin-top-xl">亲，您当前还没有收获地址</view>
				<view class="font-26 text-gray margin-top-sm">赶快添加您的收获地址吧~</view>
			</view>
			
		</view>
		<view >
			<view class="" v-for="(item,index) in alist" :key="index" @tap="addaddress(2,index)">
				<view class="flex justify-between cu-form-group">
					<view class="flex1">
						<view>
							<view class="inline-block">{{item.shipping_user}}</view>
							<view class="inline-block">{{item.mobile}}</view>
						</view>
						<view>
							{{item.detailed_address}}
						</view>
					</view>
					<view class="icons-out">
						<text class="lg font-40 text-gray cuIcon-edit"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="w-690">
			<view class="two-btn">
				<button class="w-100b cu-btn lg bg-blue round" @tap="addaddress(1,'')">新增收货地址</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isshow:false,
				alist:[]
				
			}
		},
		onShow() {
			this.addresslist()
		},
		methods: {
			addresslist(){
				var datas = {
					user_id: uni.getStorageSync('user_id'), //用户id 必传
				}
				this.$myRequest({
					url: "customer/query_shipping_address",
					method: "POST",
					data: datas,
					type: '',
					hideLoading: true,
				}).then(res => {
					console.log(res, '1111');
					if (res.code == 200) {
						this.alist = res.data;
						if(res.data.length == 0){
							this.isshow = true
						} else {
							this.isshow = false
						}
					}
				})
			},
			// 新增收货地址
			addaddress(type,id){
				var datass ='';
				console.log(id)
				if(type==2){
					datass = JSON.stringify(this.alist[id]);
					id = datass.id;
				}
				uni.navigateTo({
					url:`../addaddress/addaddress?type=${type}&id=${id}&alist=${datass}`
				})
			}
		}
	}
</script>

<style scoped>
	.no-data {
		text-align: center;
		margin-top: 80upx;
	}

	.no-data image {
		width: 330upx;
		height: 300upx;
	}
	.two-btn{
		width: 560upx;
		margin:auto;
		margin-top:108upx;
	}
	.icons-out{
		margin-left: 40upx;
	}
</style>
