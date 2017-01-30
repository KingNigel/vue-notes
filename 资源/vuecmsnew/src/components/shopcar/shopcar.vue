<template>
	<div class="tmpl">
		<!--1.0 商品列表-->
		<div class="row" v-for="(item,index) in shopcarlist">
			<div class="leftdiv">
				<mt-switch class="switch" v-model="values[index]"></mt-switch>
			</div>
			<div class="centerdiv">
				<img width="75" height="75" :src="item.thumb_path" alt="">
			</div>
			<div class="rightdiv">
				<h4>{{item.title}}</h4>
				<span>￥{{item.sell_price}}</span>
				<subnumber :initcount="item.count" :goodsid="item.id" class="subnumber" v-on:count="getcount"></subnumber>
				<a @click="del(item.id)">删除</a>
			</div>
		</div>

		<!--2.0 总计-->
		<div class="total">
			<div class="left">
				<h5>总计(不含运费)</h5>
				<span>已经勾选商品{{selectedcount}}件,总价￥{{settment}}元</span>
			</div>
			<div class="right">
				<mt-button class="settm" type="danger" size="normal" @click="tosettemt">去结算</mt-button>
			</div>
		</div>

		{{values}}
	</div>
</template>

<style scoped>
	/*2.0 总计*/
	.total{
		padding: 10px;
		background-color: rgba(1,1,1,0.1);
		margin-top: 10px;
		height: 80px;
	}
	.total h5{
		color:black;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.total .left{
		width: 70%;
		float: left;
	}

	.total .right{
		width: 28%;
		float: right;
		height: 80px;
	}

	.total .settm{
		margin-top: 10px;
	}

	/*1.0 商品列表*/
	.row{
		display: flex;
		margin-top: 5px;
		border-bottom: 1px solid rgba(1,1,1,0.3);
		padding: 5px;
	}
	.row .leftdiv{
		flex: 0 0 20px;
	}
	.switch{
		margin-top: 20px;
	}
	.row .centerdiv{
		flex: 0 0 75px;
	}
	.row .rightdiv{
		flex: 1;
	}
	.row .rightdiv h4{
		color:#0094ff;
		padding: 5px 0;
	}
	.row .rightdiv .subnumber{
		display: inline;
		margin: 0 10px;
	}

	.row .rightdiv span{
		color:red;
		font-size: 16px;
	}


</style>

<script>
	import subnumber from '../subcomp/subnumber.vue';
	import {getItem,setItem,subStrictItem,removeItem} from '../../kits/localStorageHelper.js'
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	import {getUserId,setUserId} from '../../kits/loginHelper.js';

export default{
	data(){
		return {
			selectedcount:0, //选择商品的总个数
			values:[],  //用来存储每条数据的switch的值的,只要选中了，里面的存储的就是true
			shopcarlist :[] //用来储存购物车中的商品[thumb_path:'http://..',count:1,id:89]
		}
	},
	created(){
		this.initPageData();
	},
	methods:{
		//去结算
		tosettemt(){
			//1.0 判断是否有选择至少一个商品
			let newarr= this.values.filter(c=>c ==true);
			if(newarr.length==0){
				Toast('请至少选择一个商品');
				return;
			}

			//2.0 判断是否有登录
			let userid = getUserId();
			if(!userid){
				//应该跳转到登录组件
				this.$router.push({name:'login'});
			}else{
				//跳转到订单页面
				this.$router.push({name:'setorder'});
			}
		},
		//获取到数量选择组件中的数值
		getcount(resobj){
			//1.0 判断resobj中的type类型
			if(resobj.type =='add'){
				//增加一个商品数量
				this.add(resobj);
				//2.0 更新掉shopcarlist中当前商品对于的数量
				this.updateshopcarlist(1,resobj.goodsid);
			}else if(resobj.type=="substrict"){
				//减少一个商品数量
				subStrictItem(resobj.goodsid);
				//2.0 更新掉shopcarlist中当前商品对于的数量
				this.updateshopcarlist(-1,resobj.goodsid);
			}

		},
		add(resobj){
			setItem({goodsid:resobj.goodsid,count:1});
		},
		updateshopcarlist(count,goodsid){
			//1.0 找到商品的数据
			for(let i = 0; i<this.shopcarlist.length;i++){
				if(this.shopcarlist[i].id == goodsid){
					this.shopcarlist[i].count = this.shopcarlist[i].count + count;
				}
			}
		},
		//根据商品id获取商品数据
		initPageData(){
			//1.0 从localStorage中获取所有的商品id
			// arr的数据格式： [{goodsid:1,count:1},{goodsid:1,count:2}{},{}]
			let arr = getItem();
			let goodsObj = {}; //负责将goodsid的值当做属性名称，count值当做属性值,格式：{89,12,90,1}
			arr.forEach(item=>{
				if(goodsObj[item.goodsid]){
					//存在，则将count追加上去
					let tmpcount = 	goodsObj[item.goodsid];
					tmpcount+=item.count;
					goodsObj[item.goodsid] = tmpcount;
				}else{
					//如果不存在则直接设置count上去
					goodsObj[item.goodsid] = item.count;
				}
			});

			//1.0.1 将goodsObj中的属性名称拿出来
			let idarr = [];
			for(let goodsidvalue in goodsObj){
				idarr.push(goodsidvalue);
			}
			let ids = idarr.join(',');

			//2.0 请求api获取数据
			let url = common.apihost+'/api/goods/getshopcarlist/'+ids;
			this.$http.get(url).then(res=>{
//
				// 应该将thumb_path属性的图片字符串加上域名前缀
			res.body.message.forEach(item=>{
				item.thumb_path = common.imghost + item.thumb_path;
				item.count = goodsObj[item.id];

				//初始化values数组，值全部设置为false]
				this.values.push(false);
			});
				this.shopcarlist = res.body.message;

			});
		},
		//统计选择商品的总价
		getTotalAmount(){
			let totalAmount = 0;
			this.values.forEach((item,index)=>{
				if(item ==true){
				let goodsinfo = this.shopcarlist[index] //获取到当前选择的商品
				//开始计算商品总价
				let amount = goodsinfo.count * goodsinfo.sell_price;
				totalAmount+=amount;
				}
			});

			return totalAmount;
		},
		//删除商品数据
		del(goodsid){
			//1.0 将shopcarlist中的数据删除
			let index = this.shopcarlist.findIndex(c=>c.id == goodsid);
			if(index >=0) {
				this.shopcarlist.splice(index, 1);
			}

			//2.0 删除localStorage中的数据
			removeItem(goodsid);
		}

	},
	computed:{
		//统计总价格
		settment(){
			//注意点：这个settment的计算属性是依赖于this.values数组的值的改变而会被重新触发
			//并且一定要在<template>中使用settment才会被触发
			//1.0 统计当前选择的个数
			let trueArr = 	this.values.filter(v=>v==true);
			this.selectedcount = trueArr.length;

			//2.0 计算价格即可
			return this.getTotalAmount();
		}
	},
	components:{
		subnumber
	}
}
	
</script>

