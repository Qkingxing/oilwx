(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/station/station"],{"39d2":function(t,n,e){"use strict";e.r(n);var o=e("5f43"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=a.a},"5f43":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{station:[],lat:"",lon:""}},onLoad:function(){this.getlocation()},onShow:function(){},methods:{getlocation:function(){var t=this,n=new t.$amap.AMapWX({key:t.$base.gd_key});n.getRegeo({success:function(n){console.log(n);n[0].regeocodeData.formatted_address;t.lat=n[0].latitude,t.lon=n[0].longitude,t.getsite(t.lat,t.lon)},fail:function(t){}})},getsite:function(t,n){var e=this,o={latitude:t,longitude:n};this.$myRequest({url:"work/get_latitude_longitudes",method:"POST",type:"php",data:o,hideLoading:!0}).then((function(t){if(console.log(t,"列表"),200==t.code){var n=t.data;n.forEach((function(t){t.img="../../../static/images/youlogo.png"})),console.log(n),e.station=n}})).catch((function(t){}))}}};n.default=o},"6d4e":function(t,n,e){"use strict";var o,a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}))},"8ced":function(t,n,e){"use strict";(function(t){e("238a"),e("921b");o(e("66fd"));var n=o(e("9bd9"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"9bd9":function(t,n,e){"use strict";e.r(n);var o=e("6d4e"),a=e("39d2");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("f2e3");var i,c=e("f0c5"),f=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"14e021d7",null,!1,o["a"],i);n["default"]=f.exports},c92f:function(t,n,e){},f2e3:function(t,n,e){"use strict";var o=e("c92f"),a=e.n(o);a.a}},[["8ced","common/runtime","common/vendor"]]]);