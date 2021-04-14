<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">发票管理</block>
		</cu-custom>
		<view class="w-690" v-if="isshow">
			<view class="no-data">
				<image src="../../../static/images/zwsj.png" mode=""></image>
				<view class="font-32 margin-top-xl">亲，您当前还没有发票抬头哦</view>
				<view class="font-26 text-gray margin-top-sm">请先新增发票抬头哦~</view>
			</view>
			<view class="two-btn">
				<button class="w-100b cu-btn lg bg-blue round" @tap="addinvoice(1,'')">新增发票</button>
				<!-- <button class="w-100b cu-btn lg line-blue round margin-top-xl" @tap="wximport">从微信导入</button> -->
			</view>
		</view>
		<view v-else>
			<view class="list" v-for="(item,index) in alist" :key="index" @tap="addinvoice(2,item)">
				<view class="flex justify-between cu-form-group">
					<view class="flex1">
						<view>
							<view class="inline-block">{{item.look_ticket_name}}</view>
							<view class="margin-left inline-block">{{item.mobile}}</view>
						</view>
						<view>
							{{item.unit_address}}
						</view>
					</view>
					<view class="icons-out">
						<text style="font-size: 40upx;" class="lg  text-gray cuIcon-edit"></text>
					</view>
				</view>
			</view>
			<view class="addbtn">
				<button class="cu-btn bg-blue lg" @tap="addinvoice(1,'')">添加发票</button>
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
		onLoad() {
			
		},
		onShow() {
			this.invoicelist()
		},
		methods: {
			invoicelist(){
				var datas = {
					user_id: uni.getStorageSync('user_id'), //用户id 必传
				}
				this.$myRequest({
					url: "customer/query_look_ticket",
					method: "POST",
					data: datas,
					type: '',
					hideLoading: true,
				}).then(res => {
					console.log(res, '发票列表');
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
			// 新增发票
			addinvoice(type,item){
				// type  1新增   2修改
				let items = JSON.stringify(item)
				uni.navigateTo({
					url:`../addinvoice/addinvoice?type=${type}&items=${items}`
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
	.list{
		border-bottom: 10upx solid #f0f0f0;
	}
	.addbtn{
		position: fixed;
		bottom: 50upx;
		left:0;
		width: 100%;
		display: flex;
		z-index: 66;
		justify-content: center;
	}
	.addbtn button{
		width: 600upx;
		
	}
</style>
