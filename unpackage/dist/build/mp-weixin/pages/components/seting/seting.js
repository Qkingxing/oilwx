(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/seting/seting"],{"00a1":function(e,t,n){"use strict";n.r(t);var a=n("7f18"),r=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);t["default"]=r.a},1278:function(e,t,n){"use strict";var a,r=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return a}))},"22a9":function(e,t,n){},"59e9":function(e,t,n){"use strict";n.r(t);var a=n("1278"),r=n("00a1");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("64af");var i,s=n("f0c5"),o=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,"39e797a8",null,!1,a["a"],i);t["default"]=o.exports},"64af":function(e,t,n){"use strict";var a=n("22a9"),r=n.n(a);r.a},"7f18":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{userimg:"",username:"",phone:"",cardnum:"",hytype:"",email:"",address:""}},onLoad:function(){this.phone=e.getStorageSync("mobile"),this.userimg=e.getStorageSync("userimg"),this.username=e.getStorageSync("username"),this.cardnum=e.getStorageSync("cardnum"),this.hytype=e.getStorageSync("hytype")},onShow:function(){this.getmess()},methods:{myewm:function(){e.navigateTo({url:"../ewm/ewm"})},setemail:function(){var t=this.email;e.navigateTo({url:"../setmail/setmail?email=".concat(t)})},gaddress:function(){var t=this.address;e.navigateTo({url:"../gaddress/gaddress?address=".concat(t)})},getmess:function(){var t=this,n={user_id:e.getStorageSync("user_id")};this.$myRequest({url:"user/checkUseInfo",method:"POST",type:"php",data:n,hideLoading:!0}).then((function(e){console.log(e,"12"),200==e.code&&(t.email=e.data.email,t.address=e.data.address)})).catch((function(e){}))}}};t.default=n}).call(this,n("543d")["default"])},de7f:function(e,t,n){"use strict";(function(e){n("238a"),n("921b");a(n("66fd"));var t=a(n("59e9"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["de7f","common/runtime","common/vendor"]]]);