<template>
    <div class="tmpl">
      <!--利用MUI中的图文列表样式实现新闻列表-->
        <ul class="mui-table-view">
            <!--<li  class="mui-table-view-cell mui-media">-->
                <!--<a href="javascript:;">-->
                    <!--<img class="mui-media-object mui-pull-left" src="../../../statics/images/menu3.png">-->
                    <!--<div class="mui-media-body">-->
                        <!--幸福-->
                        <!--<p class='mui-ellipsis'>-->
                            <!--发表时间:2017-1-10-->
                            <!--<span>点击数：100</span>-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</a>-->
            <!--</li>-->
            <li v-for="item in list" class="mui-table-view-cell mui-media">
                <router-link v-bind='{to:"/news/newsinfo/"+item.id}'>
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            发表时间:{{item.add_time | fmtdate('YYYY-MM-DD')}}
                            <span>点击数：{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .mui-table-view .mui-media-object{
        max-width:62px;
        height: 62px;
        line-height: 62px;
    }
    .mui-table-view-cell{
       padding-left: 10px;
    }
    .mui-ellipsis{
       margin-top: 20px;
    }
    .mui-ellipsis {
        color:#0094ff;
        font-size: 12px;
    }

    .mui-ellipsis > span{
        position: absolute;
        top:50px;
        right: 20px;
    }
</style>
<script>
    import common from '../../kits/common.js';

    export default{
        data(){
            return{
                list:[]
            }
        },
        created(){
            this.getnewslist(); //当当前组件创建完毕以后，即加载数据
        }
        ,
        methods:{
           getnewslist(){
               //1.0 利用vue-resource请求到图文资讯数据列表
               var url = common.apihost+'/api/getnewslist';
                this.$http.get(url).then(
                        (res)=>{
                   this.list= res.body.message;
                },
                        (res)=>{
                   console.log('图问资讯获取失败');
               }
                );
               //2.0 讲列表数据赋值给 list属性
           }
        }
    }
</script>
