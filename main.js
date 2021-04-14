import Vue from 'vue'
import App from './App'

import Index from './pages/index/index.vue'
Vue.component('Index',Index)

import Shop from './pages/shop/index.vue'
Vue.component('Shop',Shop)

import Order from './pages/order/index.vue'
Vue.component('Order',Order)

import User from './pages/user/index.vue'
Vue.component('User',User)

// 顶部title
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

// 粗分割线
import cuXian from './colorui/components/cu-xian.vue'
Vue.component('cuxian',cuXian)

// 高德地图sdk
import amap from "./common/js_sdk/amap-wx.js";
Vue.prototype.$amap = amap;

// 引入全局常量
import base from './common/config';
Vue.prototype.$base = base;


import LbPicker from './common/lb-picker'
Vue.component("lb-picker", LbPicker)

//全局接口
import myRequest from './common/require';
Vue.prototype.$myRequest = myRequest.sendRequest;

// 防止重复点击
import noclick from './common/NOclick.js'
Vue.prototype.$noMultipleClicks = noclick.noMultipleClicks;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



