(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/addinvoice/addinvoice"],{"15c6":function(t,e,i){"use strict";var n=i("dcef"),a=i.n(n);a.a},"1a46":function(t,e,i){"use strict";i.r(e);var n=i("84ff"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"84ff":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{type:"",editid:"",listitem:{},radioarr:[{label:"单位",value:"0"},{label:"个人",value:"1"}],radioval:"0",name:"",nums:"",address:"",tell:"",bank:"",banknum:"",switchA:!1,tagindex:"-1",ordername:""}},onLoad:function(t){if(this.type=t.type,"2"==t.type){var e=JSON.parse(t.items);console.log(e),this.radioval=Number(e.look_ticket_type)-1,this.bank=e.bank,this.name=e.look_ticket_name,this.nums=e.look_ticket_ein,this.address=e.unit_address,this.tell=e.mobile,this.editid=e.id,this.banknum=e.bank_account,this.switchA=1==e.look_ticket_status,1==e.look_ticket_type?this.name=e.look_ticket_name:this.ordername=e.look_ticket_name}},methods:{RadioChange:function(t){this.radioval=t.detail.value,console.log(this.radioval,"value的值")},SwitchA:function(t){this.switchA=t.detail.value},tagstap:function(t,e){this.tagindex=e},saveinvoice:function(){if(0==this.radioval){if(""==this.name)return void t.showToast({icon:"none",title:"单位名称不正确"});if(1!=/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(this.nums))return void t.showToast({icon:"none",title:"单位税号不正确"})}else if(""==this.ordername)return void t.showToast({icon:"none",title:"请输入名称"});var e={user_id:t.getStorageSync("user_id"),id:1==this.type?"":this.editid,look_ticket_type:Number(this.radioval)+1,look_ticket_name:0==this.radioval?this.name:this.ordername,look_ticket_ein:this.nums,unit_address:this.address,mobile:this.tell,bank:this.bank,bank_account:this.banknum,look_ticket_status:1==this.switchA?"1":"2"};this.$myRequest({url:"customer/add_look_ticket",method:"POST",data:e,type:"",hideLoading:!0}).then((function(e){console.log(e,"1111"),200==e.code&&t.navigateBack({delta:-1})}))}}};e.default=i}).call(this,i("543d")["default"])},ba3e:function(t,e,i){"use strict";i.r(e);var n=i("bf0a"),a=i("1a46");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("15c6");var s,c=i("f0c5"),u=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"2b729f02",null,!1,n["a"],s);e["default"]=u.exports},bf0a:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},dcef:function(t,e,i){},e6a4:function(t,e,i){"use strict";(function(t){i("238a"),i("921b");n(i("66fd"));var e=n(i("ba3e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["e6a4","common/runtime","common/vendor"]]]);