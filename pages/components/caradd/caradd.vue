<template>
	<view>
		<cu-custom bgColor="bg-top-zdy" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">车辆{{title}}</block>
		</cu-custom>
		<view>
			<view class="w-690 padding-tb flex justify-start text-red align-center">
				<text class="lg  cuIcon-notification"></text>
				<view class="margin-left-xs">请勿使用临时车牌开通秒付</view>
			</view>
			<view class="cu-form-group border-top-20">
				<view class="title" @tap="plateShow = true">车牌号</view>
				<input placeholder="请点此输入" disabled="inputDisabled" @tap="plateShow = true" v-model.trim="plateNo" />
				<plate-input v-if="plateShow" :plate="plateNo" @export="setPlate" @close="plateShow = false" />
			</view>

			<view class="w-100b border-top-20">
				<view class="w-690">
					<view>
						<view class="padding-tb">请选择车牌颜色</view>
					</view>
					<view class="pai-out flex justify-between padding-bottom">
						<view class="pai-list" :class="item.bg" v-for="(item,index) in colorarr" :key="index" @tap="changec(item,index)">
							<view class="pai-li flex align-center justify-center">{{item.title}}</view>
							<view :class="index == select?'select':''"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="w-100b border-top-20 border-bo-20">
				<view class="w-690 flex align-center justify-between padding-tb" @tap="handleTap('picker1')">
					<view>默认油品</view>
					
					<view class="flex align-center">
						<view class="text-gray" v-if="results == ''">请选择油品</view>
						<view v-else>{{results}}</view>
						<view class="xyjt"></view>
						<lb-picker ref="picker1" :props="myProps" v-model="results" mode="selector" :list="resultarr" @change="handleChange"
						 @confirm="handleConfirm" @cancel="handleCancel">
						</lb-picker>
					</view>
				</view>
			</view>
			
			<view class="addbtn">
				<button class="cu-btn bg-blue lg" @tap="addcar">确定添加</button>
			</view>
		</view>
		<!-- <wzp-picker ref="wzpPicker" :mode="mode" :pickerList="pickerList" :defaultIndex="defaultIndex" :equalModeId="equalModeId"
		 @onConfirm="onConfirm"></wzp-picker> -->
	</view>
</template>

<script>
	import plateInput from '../../../common/uni-plate-input/uni-plate-input.vue';
	// import wzpPicker from "../../../common/wzp-picker/wzpPicker.vue";
	export default {
		components: {
			plateInput,
			// wzpPicker
		},
		data() {
			return {
				title: '',
				type:'',
				plateNo: '',
				plateShow: false,
				inputDisabled: true,

				colorarr: [{
					bg: 'bg1',
					title: '蓝牌',
					val: '1'
				}, {
					bg: 'bg2',
					title: '黄牌',
					val: '2'
				}, {
					bg: 'bg3',
					title: '绿牌',
					val: '3'
				}],
				select: '-1',
				asd: false,

				results:'',
				resultsid:'',
				resultarr:[],
				myProps: {
				  label: 'name',
				  value: 'id',
				},
			}
		},
		onLoad(option) {
			this.type = option.type;
			if (option.type == 1) {
				this.title = '新增'
			} else {
				this.title = '编辑'
			}
			console.log(JSON.parse(option.items));
			let items = JSON.parse(option.items)
			console.log(items);
			this.plateNo = items.plate_number
			this.select = Number(items.plate_colour) - 1
			this.resultsid = items.default_oil
		},
		onShow() {
			this.getyou()
		},
		methods: {
			getyou() {
				var datas = {

				}
				this.$myRequest({
					url: "order/queryOilSet",
					method: "POST",
					data: datas,
					type: '',
					hideLoading: true,
				}).then(res => {
					// console.log(res, '油品');
					if (res.code == 200) {
						var gdata = res.data;
						var newArr = gdata.map(item => ({
							id: item.id,
							name: item.oils_name || item.name
						}))
						this.resultarr = newArr;
						if(this.type == 2){
							for (let item of newArr) {
								if(item.id == this.resultsid){
									this.results = item.name
								}
							}
						}
					}
				})
			},

			setPlate(plate) {
				if (plate.length >= 7) this.plateNo = plate;
				this.plateShow = false;
			},
			changec(item, index) {
				console.log(item, index);
				this.select = index
				this.asd = true
			},

			
			// picker组件
			handleTap (name) {
				this.$refs[name].show()
			},
			// change事件
			handleChange (item) {
				// console.log('change::', item)
			},
			// 点击确定
			handleConfirm (item) {
				console.log('confirm::', item)
				this.results = item.item.name;
				this.resultsid = item.item.id
			},
			// 点击取消
			handleCancel (item) {
				// console.log('cancel::', item)
			},
			// picker结束
			
			addcar(){
				if(this.plateNo == ''){
					uni.showToast({
						icon:'none',
						title:'请输入车牌号'
					})
					return
				} else if(this.select < 0){
					uni.showToast({
						icon:'none',
						title:'请选择车牌颜色'
					})
					return
				} else if(this.resultsid == ''){
					uni.showToast({
						icon:'none',
						title:'请选择默认油品'
					})
					return
				}
				
				var datas = {
					plate_number:this.plateNo,
					plate_colour:Number(this.select) + 1,
					default_oil: this.resultsid
				}
				this.$myRequest({
					url: "app/Appidentityset",
					method: "POST",
					data: datas,
					type: 'php',
					hideLoading: true,
				}).then(res => {
					console.log(res, '添加车辆');
					if (res.code == 200) {
						uni.navigateBack()
					}
				})
			}	
			
		}
	}
</script>

<style scoped>
	.cu-form-group {
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}

	.pai-out {}

	.pai-list {
		width: 210upx;
		height: 80upx;
		text-align: center;
		color: #fff;
		font-size: 36upx;
		position: relative;
		border-radius: 6upx;
	}

	.pai-li {
		height: 80upx;
	}

	.border-bo-20 {
		border-bottom: 20upx solid #F0F0F0;
	}

	.select:before {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		border: 22upx solid red;
		border-top-color: transparent;
		border-left-color: transparent;
	}

	.xyjt {
		width: 14upx;
		height: 14upx;
		border-top: 2upx solid #040A46;
		border-right: 2upx solid #040A46;
		transform: rotate(45deg);
		margin-left: 20upx;
	}

	.select:after {
		content: '';
		width: 6upx;
		height: 14upx;
		position: absolute;
		right: 6upx;
		bottom: 8upx;
		border: 4upx solid #fff;
		border-top-color: transparent;
		border-left-color: transparent;
		transform: rotate(45deg);
	}

	.npselect {
		opacity: 0.5;
	}

	.bg1 {
		background: #2e59f5;
	}

	.bg2 {
		background: #e8c221;
	}

	.bg3 {
		background: #50ed71;
	}

	.border-top-20 {
		border-top: 20upx solid #F0F0F0;
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
