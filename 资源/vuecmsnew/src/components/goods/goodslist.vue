<template>
    <div class="tmpl">
      <!--1.0 将mui中的图文表格迁移过来后加以改成成自己的需求-->
        <ul class="mui-table-view mui-grid-view">
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-6">-->
                <!--<a href="#">-->
                    <!--<img class="mui-media-object" src="http://ofv795nmp.bkt.clouddn.com//upload/201504/20/thumb_201504200046589514.jpg">-->

                <!--</a>-->
                <!--<div class="desc">-->
                    <!--<h5>想静静的喝咖啡</h5>-->
                    <!--<div class="box">-->
                      <!--<p>-->
                        <!--<h6><span>￥2195</span> <s>￥2499</s></h6>-->
                      <!--</p>-->
                        <!--<div class="sell">-->
                            <!--<div class="topsell">热卖中</div>-->
                            <!--<div class="count">剩60件</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->

            <li v-for="item in goodslist" class="mui-table-view-cell mui-media mui-col-xs-6">
                <router-link v-bind='{to:"/goods/goodsinfo/"+item.id}'>
                    <img class="mui-media-object" :src="item.img_url">
                </router-link>
                <div class="desc">
                    <h5>{{item.title}}</h5>
                    <div class="box">
                        <p>
                        <h6><span>￥{{item.sell_price}}</span> <s>￥{{item.market_price}}</s></h6>
                        </p>
                        <div class="sell">
                            <div class="topsell">热卖中</div>
                            <div class="count">剩{{item.stock_quantity}}件</div>
                        </div>
                    </div>
                </div>
            </li>


        </ul>
    </div>
</template>
<style scoped>
    .mui-table-view.mui-grid-view .mui-table-view-cell{
        padding: 5px;
    }
    .mui-grid-view li{
        border: 1px solid rgba(92,92,92,0.4);
        margin: 4px 2px 4px 4px;
        box-shadow:0 0 4px #666;
        height: 300px;
    }
    .desc h5{
        color:#000;
        text-align: left;
        font-size:12px;
        font-family: '微软雅黑';
    }
    .desc .box{
        height: 60px;
        background-color: rgba(92,92,92,0.1);
        margin: 0;
        padding: 5px;
    }
    .desc .box h6{
        text-align: left;
    }
    .desc .box h6 span{
        color:red;
        font-size: 14px;
        margin-right: 15px;
    }
    .sell{
        margin-top: 15px;
        font-size: 12px;
    }
    .sell .topsell{
        float: left;
        width: 40%;
        text-align: left;
        color:rgba(92,92,92,0.8);
    }
    .sell .count{
        float: right;
        width: 55%;
        text-align: right;
        color:rgba(92,92,92,0.8);
    }
</style>
<script>
    import common from '../../kits/common.js';
    export default{
        data(){
            return{
                goodslist:[] //用来存储api返回的message中的数据
            }
        },
        created(){
             //注意一下：在这个里面之所以能够调用方法，是因为在调用组件的生命周期created()方法的之前已经
            //在vue对象实例中创建好了data()和methods中的所有成员
            this.getgoodslist(1); //默认获取第一页数据
        }
        ,
        methods:{
           getgoodslist(pageindex){
               //1.0 定义api
               let url =common.apihost +'/api/getgoods?pageindex='+pageindex;

               //2.0 发出ajax的get请求
               this.$http.get(url).then(res=>{
                   this.goodslist = res.body.message;
               });
           }
        }
    }
</script>
