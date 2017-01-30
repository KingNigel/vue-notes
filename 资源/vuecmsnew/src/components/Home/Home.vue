<template>
	<div class="tmpl">
	<!-- 使用subimgsilder.vue组件实现轮播-->
	<subimgsilder :imagelist="list"></subimgsilder>
	<!-- 利用mui中的9宫格实现系统的导航按钮 -->
	<div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            <router-link to="/news/newslist">
	                    <span class="mui-icon mui-icon-home"></span>
	                    <div class="mui-media-body">新闻资讯</div>
					</router-link >
                    </li>
		           
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            <router-link to="/photo/photolist">
	                    <span class="mui-icon mui-icon-navigate"></span>
	                    <div class="mui-media-body">图片分享</div>
	                    </router-link>
                    </li>
                     <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            <router-link to="/goods/goodslist">
	                    <span class="mui-icon mui-icon-gear"></span>
	                    <div class="mui-media-body">商品购买</div>
	                    </router-link>
                    </li>
                     <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            <a href="#">

	                    <span class="mui-icon mui-icon-paperplane"></span>
	                    <div class="mui-media-body">留言反馈</div>
	                    </a>
                    </li>
                     <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            <a href="#">
	                    <span class="mui-icon  mui-icon-info"></span>
	                    <div class="mui-media-body">视频专区</div>
	                    </a>
                    </li>
                     <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            <a href="#">
	                    <span class="mui-icon  mui-icon-help"></span>
	                    <div class="mui-media-body">联系我们</div>
	                    </a>
                    </li>
		        </ul> 
		</div>
	</div>
</template>

<script>
	//1.0 导入 subimgsilder.vue组件
	import subimgsilder from '../subcomp/subimgsilder.vue';
	import common from '../../kits/common.js'
export default{
	data(){
		return {
			// list: [{
			// 			url: 'http://www.itcast.cn/subject/phoneweb/index.html',
			// 			img: 'http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg'
			// 		}, {
			// 			url: 'http://www.itcast.cn/subject/phoneweb/index.html',
			// 			img: 'http://ofv795nmp.bkt.clouddn.com/vuelogobanner2-1.jpg'
			// 		}]
		 		
			list:[]
		}
	},
	created(){
		this.getlunbo(); //当home.vue组件创建完毕以后，调用数据请求
	},
	methods:{
			getlunbo(){
				var url = common.apihost+'/api/getlunbo';
				this.$http.get(url).then(res=>{
					//成功则将res.body.message中的数据赋值给this.list属性即可
					this.list = res.body.message;
				},res=>{
					console.log('轮播图获取失败');
				});
			}
		},
	components:{
		subimgsilder
	}
}
	
</script>

<style scoped>

/*
定义9宫格中的图片样式
 */
.mui-content{
	background-color: #fff;
}
.mui-grid-view.mui-grid-9{
	background-color: #fff;
	border-top:none;
	border-left:none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell
{
	border-right:none;
	border-bottom:none;
}

.mui-icon{
	width: 50px;
	height: 50px;
}
  	            
	
.mui-icon-home{
	background-image: url(../../../statics/images/menu10.png);
	background-repeat: round;
}
.mui-icon-navigate{
	background-image: url(../../../statics/images/menu3.png);
	background-repeat: round;
}
.mui-icon-gear{
	background-image: url(../../../statics/images/menu4.png);
	background-repeat: round;
}
.mui-icon-paperplane{
	background-image: url(../../../statics/images/menu5.png);
	background-repeat: round;
}
.mui-icon-info{
	background-image: url(../../../statics/images/menu6.png);
	background-repeat: round;
}
.mui-icon-help{
	background-image: url(../../../statics/images/menu9.png);
	background-repeat: round;
}
.mui-icon-home:before,
.mui-icon-navigate:before,
.mui-icon-gear:before,
.mui-icon-paperplane:before,
.mui-icon-info:before,
.mui-icon-help:before{
	content: '';
}






</style>