//1.0 导入相关包
import Vue from 'vue';
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'


//1.0.2 导入mui相关的css
import '../statics/mui/css/mui.css';
import '../statics/mui/css/icons-extra.css'

// import '../statics/mui/js/mui.min.js'


import mintUI from 'mint-ui'
Vue.use(mintUI);

//导入mint-ui的css
import 'mint-ui/lib/style.min.css';

//导入我们自己定义好的全局样式，可以用来覆盖mint-ui和mui中的样式
import '../statics/css/site.css';

//2.0 在Vue中加载vueRouter 
Vue.use(vueRouter);
Vue.use(vueResource);  //使用vueResource 对象才能自动在Vue对象实例上挂在一个$http

//2.0.1 加载图片预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

//2.0.1 在Vue上注册一个全局过滤器名称叫做 tolowercase1
import moment from 'moment';
Vue.filter('fmtdate',function(input,datefmtstring){
	//这里由于传入的datefmtstring的格式种类很多，我们自己实现起来是比较复杂，要做很多的if判断，所以
	//我们使用moment.js的日期格式化插件 :http://momentjs.cn/
	return moment(input).format(datefmtstring);
});

//3.0 定义路由规则对象
import App from './App.vue'
import Home from './components/Home/Home.vue';
import member from './components/member/member.vue';
import shopcar from './components/shopcar/shopcar.vue';
import search from './components/search/search.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/info.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodscomment from './components/goods/comment.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import login from './components/login/login.vue';
import setorder from './components/order/setorder.vue';



let router = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		//表示浏览器如果访问的是http://localhost:3008/#/ 或者http://localhost:3008这种形式
		//则直接跳转到http://localhost:3008/#/Home，那么vue-router就会自动加载Home
		{name:'root',path:'/',redirect:'/Home'}, 
		{name:'home',path:'/Home',component:Home},
		{name:'member',path:'/member',component:member},
		{name:'shopcar',path:'/shopcar',component:shopcar},
		{name:'search',path:'/search',component:search},
		{name:'newslist',path:'/news/newslist',component:newslist}, //图文资讯列表的路由规则
		{name:'newsinfo',path:'/news/newsinfo/:id',component:newsinfo}, //图文资讯详细描述的路由规则
		{name:'photolist',path:'/photo/photolist',component:photolist}, //图片分享列表组件
		{name:'photoinfo',path:'/photo/info/:id',component:photoinfo}, //图片的详情
		{name:'goodslist',path:'/goods/goodslist',component:goodslist}, //商品列表组件
		{name:'goodsinfo',path:'/goods/goodsinfo/:id',component:goodsinfo}, //商品详情组件
		{name:'goodscomment',path:'/goods/comment/:id',component:goodscomment}, //商品的评论组件
		{name:'goodsdesc',path:'/goods/goodsdesc/:id',component:goodsdesc} ,//商品的图文组件
		{name:'login',path:'/login',component:login}, //登录页面的路由规则
		{name:'setorder',path:'/order/setorder',component:setorder} //下订单页面

	]
});

//4.0 使用router
new Vue({
	el:'#app',
	router,
	render:c=>c(App)
});