<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="">
			<form>
				<view class="cu-form-group">
					<view class="title">所在地区</view>
					<view class="flex flex1 align-center justify-between" @tap="handleTap('pickercity')">
						<view class="text-gray" v-if="!resultslabel">请选择地区</view>
						<view v-else>{{ resultslabel }}</view>
						<view class="xyjt"></view>
					</view>
					<lb-picker ref="pickercity"
					  v-model="results"
					  mode="multiSelector"
					  :list="pickerList"
					  :level="3"
					  :props="myProps"
					  :dataset="{ name: 'resultslabel' }"
					  @change="handleChange"
					  @confirm="handleConfirm"
					  @cancel="handleCancel"></lb-picker>
				</view>
				
				<view class="cu-form-group">
					<view class="title">详细地址</view>
					<input placeholder="街道、小区、门牌号等" v-model="details" name="input"></input>

				</view>
				<view class="cu-form-group">
					<view class="title">收货人</view>
					<input placeholder="收货人姓名" v-model="name" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input placeholder="收货人手机号" v-model="tell" name="input"></input>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">标签</view>
					<view class="flex flex1 justify-start">
						<view class="margin-right-sm" v-for="(item,index) in tagsarr" :key="index" @tap="tagstap(item,index)">
							<view class='cu-tag round ' :class="tagindex == index?'bg-blue':'line-gray'">{{item}}</view>
						</view>
					</view>
				</view> -->
				<view class="cu-form-group">
					<view class="title">设为默认地址</view>
					<switch class='blue' @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false">
					</switch>
				</view>
			</form>
			<view class="btn-out">
				<button class="cu-btn w-100b lg bg-blue round" @tap="saveaddress">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"新增收货地址",
				type: '',
				editid: '',
				citys: '',
				details: '',
				name: '',
				tell: '',
				switchA: false,
				tagsarr: ['家里', '公司', '学校'],
				tagindex: '-1',

				// picker组件
				
				
				myProps: {
				  label: 'name',
				  value: 'id',
				  children:'treeList'
				},
				results:[],
				resultslabel:'',
				pickerList:[],
				data:{}
			}
		},
		onLoad(option) {
			this.type = option.type
			this.editid = option.id;
			if(this.type==2){
				this.title = "编辑收货地址"
				this.data = JSON.parse(option.alist);
				console.log(option.alist,222)
				this.resultslabel = this.data.shipping_address;
				this.tell = this.data.mobile;
				this.name = this.data.shipping_user;
				this.details = this.data.detailed_address;
			}
			this.getprovice()
		},
		onShow() {
			
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			tagstap(item, index) {
				// console.log(item,index);
				this.tagindex = index
			},
			saveaddress() {
				var datas = {
					shipping_user: this.name,
					mobile: this.tell,
					shipping_address: this.resultslabel,
					detailed_address: this.details,
				}
				if(this.type == 1){
					datas.user_id = uni.getStorageSync('user_id')
				}else{
					datas.id = this.editid;
				}
				this.$myRequest({
					url: "customer/add_shipping_address",
					method: "POST",
					data: datas,
					type: '',
					hideLoading: true,
				}).then(res => {
					console.log(res, '1111');
					if (res.code == 200) {
						uni.showToast({
						    title: '添加成功',
						    duration: 2000
						});
					}
				})
			},

			// picker组件
			handleTap (name) {
				this.$refs[name].show()
			},
			// change事件
			handleChange (e) {
				// console.log('change::', item)
			},
			// 点击确定
			handleConfirm (e) {
				console.log(e);
				this.resultslabel = e.item[0].name +'-'+ e.item[1].name +'-'+ e.item[2].name
			},
			// 点击取消
			handleCancel (e) {
				// console.log('cancel::', item)
			},
			// picker结束
			
			
			getprovice() {
				var datas = {
					
				}
				this.$myRequest({
					url: "user/getProvince",
					method: "POST",
					data: datas,
					type: 'php',
					hideLoading: true,
				}).then(res => {
					console.log(res, '省市区');
					if (res.code == 200) {
						this.pickerList = res.data
						// uni.navigateBack({
						// 	delta: -1
						// })
					}
				})
			}
		}
	}
</script>

<style scoped>
	.cu-form-group .title {
		width: 216upx;
	}

	.btn-out {
		width: 600upx;
		margin: auto;
		margin-top: 160upx
	}

	.xyjt {
		width: 20upx;
		height: 20upx;
		border-top: 2rpx solid #040A46;
		border-right: 2rpx solid #040A46;
		transform: rotate(45deg);
	}
</style>
