<template>
    <div class="tmpl">
      <!--1.0 实现商品的轮播图subimgsilder.vue-->
        <sub-img-silder class="subimgsilder" :imagelist="imagelist"></sub-img-silder>
      <!--2.0 实现商品购买区域-->
        <div class="sell">
            <h4>{{goosinfodata.title}}</h4>
            <div class="sellprice">
                市场价:<s>￥{{goosinfodata.sell_price}}</s>   销售价:<span>￥{{goosinfodata.market_price}}</span>
            </div>
            <div class="count">
                <!--放数量的组件-->
                购买数量：<sub-number class="subnumber" v-on:count="getcount"></sub-number>
                <!--动画小球-->
                <transition v-on:before-enter="beforeEnter"
                            v-on:enter="enter"
                            v-on:after-enter="afterEnter">
                    <div v-show="isshow" class="ball"></div>
                </transition>

            </div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="toshopdata">加入购物车</mt-button>

        </div>
        <!--3.0 商品参数区域-->
        <div class="params">
            <h6 class="h6">商品参数</h6>
            <ul>
                <li>商品货号：{{goosinfodata.goods_no}}</li>
                <li>库存情况：{{goosinfodata.stock_quantity}}件</li>
                <li>上架时间：{{goosinfodata.add_time | fmtdate('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <!--4.0 商品的图文信息描述（使用一个新组goosdesc.vue件来完成）
            5.0 商品的评论区域 subcomment.vue
        -->
        <div class="footer">
            <mt-button @click="desc" plain type="primary" size="large">图文介绍</mt-button>
            <mt-button @click="comment" class="mt1" plain type="danger"  size="large">商品评论</mt-button>
        </div>

    </div>
</template>
<style scoped>
   .subimgsilder, .sell,.params,.footer{
       border: 1px solid rgba(92,92,92,0.3);
       margin: 5px;
       padding: 5px;
       border-radius:5px;
   }
    /*2.0 商品购买区域*/
   .sell{
       padding-bottom: 20px;
   }
    .sell h4{
        color:#0094ff;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        padding: 10px 0;
    }
   .sell .sellprice s{
       margin-right: 20px;
   }
   .sell .sellprice, .sell .count{
       padding: 10px;
   }
    .sell .sellprice span{
        color:red;
        font-size:18px;
    }
    .subnumber{
        display: inline-block;
    }
    .count{
        position: relative;
    }

    .ball{
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        position:absolute;
        top:0px;
        left:100px;
        z-index: 50;
        transition: all .5s cubic-bezier(.35,-0.44,.83,.67);
    }
    /*小球动画样式控制*/
   /*.drop-enter-active, .drop-leave-active {*/
       /*transition: all 1s;*/
   /*}*/

   /*.drop-enter, .drop-leave-active {*/
       /*opacity: 0;*/
   /*}*/


   /*2.0 商品购买区域end*/

    /*3.0 商品参数区域*/
    .h6{
        padding: 5px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }
    .params li{
        list-style: none;
    }
   /*3.0 商品参数区域end*/

    /*4.0 底部*/
    .mt1{
        margin-top: 20px;
    }
</style>
<script>
//1.0.1 导入组件subimgsilder.vue
import SubImgSilder from '../subcomp/subimgsilder.vue';
import common from '../../kits/common.js';

//2.0.1 导入subnumber.vue
import SubNumber from '../subcomp/subnumber.vue';

//6.0.2 注册commonvue.js
import {vueobj} from '../../kits/commonvue.js';
import {setItem} from '../../kits/localStorageHelper.js'

    export default{
        data(){
            return{
                isshow : false,
                goodscount:1, //商品的数量
                imagelist:[], //1.0.2 这个变量存储的是当前商品的轮播图图片数组
                goosinfodata:{} //2.0.2 这个变量存储的是当前商品的描述信息（包括标题，价格等）
            }
        },
        created(){
            this.getimagelist(); //1.0.4 调用方法
            this.getgoodsinfo();//2.0.3 调用方法
        },
        methods:{
            //1.0.3 定义一个获取轮播图数据的方法
           getimagelist(){
               let id = this.$route.params.id; //获取到商品id
               let url = common.apihost +'/api/getthumimages/'+id;
               this.$http.get(url).then(res=>{
                   //由于api返回的图片地址没有带域名所以要在这里补上
                   res.body.message.forEach(item=>{
                   item.img = common.imghost + item.src;
                    this.imagelist = res.body.message;
               });
               });
           },
            //2.0.2 定义一个方法用来接收子组件传入过来的值
            getcount(obj){
                this.goodscount = obj.count;
            },
            //2.0.3 定义个方法用来获取商品的介绍信息
            getgoodsinfo(){
                let id = this.$route.params.id;
                let url =common.apihost+'/api/goods/getinfo/'+id;
                this.$http.get(url).then(res=>{
                    this.goosinfodata = res.body.message[0];
                });
            },
            //5.0.1 商品评论
            comment(){
                //1.0 获取到商品的id
                let id = this.$route.params.id;

                //2.0 跳转到商品评论组件comment.vue
                this.$router.push({name:'goodscomment',params:{id:id}});
            },
            //4.0.1 定义商品图文显示方法
            desc(){
                let id = this.$route.params.id;
                this.$router.push({name:'goodsdesc',params:{id:id}})
            },
            // 6.0.1 方法实现购物数据的通知
            toshopdata(){
                //1.0 发送通知
                vueobj.$emit('shopdata',this.goodscount);

                //2.0 讲商品的购物数据存储到localStorage
                let id = this.$route.params.id;
                setItem({goodsid:id,count:this.goodscount})

                //3.0 出现动画效果
                this.isshow = !this.isshow;
            },
            //7.0 定义小球动画
            beforeEnter(el){
                //表示小球的动画开始状态
                //通常我们使用的是translate3d来开启硬件加速，提高动画的流畅度
                el.style.transform = 'translate3d(0,0,0)';
            },
            enter(el,done){
                //注意点：想要有动画的过程，就必须保证页面是在刷新的
                var offset = el.offsetWidth; //设置这句话就能保证小球实时移动
                //表示小球的动画进行到最后的状态
                el.style.transform = 'translate3d(125px,327px,0)';
                done();
            },
            afterEnter(el){
                //表示小球的动画结束状态,要将控制小球显示和隐藏的变量isshow复位
                this.isshow = !this.isshow;
            }
        },
        components:{
            SubImgSilder,
            SubNumber
        }
    }
</script>
