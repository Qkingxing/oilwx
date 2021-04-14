<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{type == '1'?'新增':'编辑'}}发票</block>
		</cu-custom>
		<view class="">
			<form>
				<view class="cu-form-group">
					<view class="title">抬头类型</view>
					<view class="flex1">
						<view class="radios" @tap.stop="">
							<radio-group class="block" @change="RadioChange">
								<view class="cu-list menu text-left flex justify-start">
									<view class="inline-block" v-for="(item,index) in radioarr" :key="index">
										<label class="flex justify-start align-center flex-sub">
											<radio class="round xs blue" :class="radioval==index?'checked':''" :checked="radioval==index?true:false"
											 :value="item.value"></radio>
											 <view class="flex-sub margin-left-xs">{{item.label}}</view>
										</label>
									</view>
								</view>
							</radio-group>
						</view>
					</view>
				</view>
				<block v-if="radioval == 0">
					<view class="cu-form-group">
						<view class="title">单位名称</view>
						<input placeholder="单位名称" v-model="name" name="input"></input>
					
					</view>
					<view class="cu-form-group">
						<view class="title">单位税号</view>
						<input placeholder="15-20位" v-model="nums" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">单位地址</view>
						<input placeholder="单位详细地址" v-model="address" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">电话号码</view>
						<input placeholder="电话号码" v-model="tell" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">开户银行</view>
						<input placeholder="开户银行" v-model="bank" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">银行账户</view>
						<input placeholder="银行账户" v-model="banknum" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">设为默认抬头</view>
						<switch class='blue' @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
					<!-- <view class="cu-form-group">
						<view class="title">从微信导入</view>
						<view class="flex1 flex justify-between align-center" @tap="wximport">
							<view>立即导入</view>
							<view class="xyjt"></view>
						</view>
					</view> -->
				</block>
				<block v-else>
					<view class="cu-form-group">
						<view class="title">名称</view>
						<input placeholder="请输入姓名" v-model="ordername" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">设为默认抬头</view>
						<switch class='blue' @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
				</block>
				
			</form>
			<view class="btn-out">
				<button class="cu-btn w-100b lg bg-blue round" @tap="saveinvoice">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				editid:'',
				listitem:{},
				radioarr:[{
					label:'单位',
					value:'0'
				},{
					label:'个人',
					value:'1'
				}],
				radioval:'0',
				
				name:'',
				nums:'',
				address:'',
				tell:'',
				bank:'',
				banknum:'',
				switchA: false,
				tagindex: '-1',
				// 个人
				ordername:''
			}
		},
		onLoad(option) {
			this.type = option.type
			// console.log(item);
			// this.listitem = option.id
			if(option.type == '2'){
				let itemsli = JSON.parse(option.items)
				console.log(itemsli);
				this.radioval = Number(itemsli.look_ticket_type) - 1
				this.bank = itemsli.bank
				this.name = itemsli.look_ticket_name
				this.nums = itemsli.look_ticket_ein
				this.address = itemsli.unit_address
				this.tell = itemsli.mobile
				this.editid = itemsli.id
				this.banknum = itemsli.bank_account
				this.switchA = itemsli.look_ticket_status == 1?true:false
				if(itemsli.look_ticket_type == 1){
					this.name = itemsli.look_ticket_name
				} else {
					this.ordername = itemsli.look_ticket_name
				}
			}
			
			
		},
		methods: {
			// 单选操作
			RadioChange(e) {
				this.radioval = e.detail.value
				console.log(this.radioval,'value的值');
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			tagstap(item, index) {
				// console.log(item,index);
				this.tagindex = index
			},
			// wximport(){
			// 	uni.chooseInvoiceTitle({
			// 	  success(res) {}
			// 	})
			// },
			saveinvoice(){
				if(this.radioval == 0){
					if(this.name == ''){
						uni.showToast({
							icon:'none',
							title:'单位名称不正确'
						})
						return
					} else if(/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(this.nums) != true){
					// } else if(this.nums == ''){
						uni.showToast({
							icon:'none',
							title:'单位税号不正确'
						})
						return
					}
					// else if(this.address == ''){
					// 	uni.showToast({
					// 		icon:'none',
					// 		title:'单位地址不正确'
					// 	})
					// 	return
					// } else if(/^1[3456789]\d{9}$/.test(this.tell) != true || /^0(\d{2,3}|\d{2,3}-)?\d{7,8}$/.test(this.tell) != true){
					// 	uni.showToast({
					// 		icon:'none',
					// 		title:'电话号码不正确'
					// 	})
					// 	return
					// } else if(this.bank == ''){
					// 	uni.showToast({
					// 		icon:'none',
					// 		title:'请填写开户银行'
					// 	})
					// 	return
					// } else if(/^\d{16,19}$/.test(this.banknum) != true){
					// 	uni.showToast({
					// 		icon:'none',
					// 		title:'银行卡号不正确'
					// 	})
					// 	return
					// }
				} else {
					if(this.ordername == ''){
						uni.showToast({
							icon:'none',
							title:'请输入名称'
						})
						return
					}
				}
				var datas = {
					user_id:uni.getStorageSync('user_id'),
					id: this.type == 1 ?  '' : this.editid, 
					look_ticket_type:Number(this.radioval) + 1,
					look_ticket_name:this.radioval == 0 ? this.name:this.ordername,
					look_ticket_ein:this.nums,
					unit_address:this.address,
					mobile:this.tell,
					bank:this.bank,
					bank_account:this.banknum,
					look_ticket_status:this.switchA == true? '1':'2'
				}
				this.$myRequest({
					url: "customer/add_look_ticket",
					method: "POST",
					data: datas,
					type: '',
					hideLoading: true,
				}).then(res => {
					console.log(res, '1111');
					if (res.code == 200) {
						uni.navigateBack({
							delta: -1
						})
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
	
	/* .radios >>> wx-radio .uni-radio-input{
		width: 32upx;
		height: 32upx;
	} */
	/* .radios radio .wx-radio-input,
	.radios radio .uni-radio-input
	 {
		margin: 0;
		width: 36upx;
		height: 36upx;
	} */
	.radios >>> wx-radio::before{
		font-size: 26upx;
		right: 8upx;
	}
	.radios .inline-block:last-child{
		margin-left: 50upx;
	}
</style>
