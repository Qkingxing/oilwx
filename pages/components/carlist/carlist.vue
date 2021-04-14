<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">车辆管理</block>
		</cu-custom>
		<view class="w-690" v-if="isshow">
			<view class="no-data">
				<image src="../../../static/images/zwsj.png" mode=""></image>
				<view class="font-32 margin-top-xl">亲，您当前还没有绑定车辆哦</view>
				<view class="font-26 text-gray margin-top-sm">请先绑定车辆~</view>
			</view>
			<view class="two-btn">
				<button class="w-100b cu-btn lg bg-blue round" @tap="addcar(1,'')">立即绑定</button>
			</view>
		</view>
		<view v-else style="padding-bottom: 160upx;">
			<view class="border-bo-20" v-for="(item,index) in alist" :key="index">
				<view class="flex justify-between cu-form-group padding-tb-sm">
					<view class="flex1">
						<view>
							<view class="inline-block color-333 font-34 ">{{item.plate_number}}</view>
							<!-- <view class="inline-block">{{item.tell}}</view> -->
						</view>
						<view class="margin-top-xs">
							默认油品:{{item.name}}
						</view>
					</view>
					<view class="icons-out" @tap="delatecar(item)">
						<text style="font-size: 40upx;" class="lg text-gray cuIcon-delete"></text>
					</view>
					<view class="icons-out" @tap="addcar(2,item)">
						<text style="font-size: 40upx;" class="lg text-gray cuIcon-edit"></text>
					</view>
				</view>
			</view>
			<view class="addbtn">
				<button class="cu-btn bg-blue lg" @tap="addcar(1,'')">添加车辆</button>
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
					// id: uni.getStorageSync('user_id'), //用户id 必传
				}
				this.$myRequest({
					url: "app/Appidentitylist",
					method: "POST",
					data: datas,
					type: 'php',
					hideLoading: true,
				}).then(res => {
					console.log(res, '车辆列表');
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
			addcar(type,items){
				// type  1新增   2修改
				var  items = JSON.stringify(items)
				uni.navigateTo({
					url:`../caradd/caradd?type=${type}&items=${items}`
				})
			},
			delatecar(item){
				console.log(item);
				uni.showModal({
					title:"提示",
					content:"确定删除该车辆吗",
					showCancel:true,
					cancelText:'取消',
					confirmText:'确定',
					success:res=>{
						if(res.confirm){
							var datas = {
								id: item.id 
							}
							this.$myRequest({
								url: "app/Appidentitydel",
								method: "POST",
								data: datas,
								type: 'php',
								hideLoading: true,
							}).then(res => {
								console.log(res);
								if (res.code == 200) {
									this.invoicelist()
								} else {
									uni.showToast({
										icon:'none',
										title:res.msg
									})
								}
							})			
						}
					}
				})
			}
			// wximport(){
			// 	uni.chooseAddress({
			// 	  success: function (res) {
			// 	    console.log(res.userName)
			// 	    console.log(res.postalCode)
			// 	    console.log(res.provinceName)
			// 	    console.log(res.cityName)
			// 	    console.log(res.countyName)
			// 	    console.log(res.detailInfo)
			// 	    console.log(res.nationalCode)
			// 	    console.log(res.telNumber)
			// 	  }
			// 	})
			// }
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
	.border-bo-20{
		border-bottom:10upx solid #f0f0f0;
	}
</style>
