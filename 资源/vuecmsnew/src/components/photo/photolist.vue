<template>
    <div class="tmpl">
        <!--1.0 分类-->

          <div class="cate">
              <ul id="cateul">
                  <li>
                      <a @click="getimglist(0)">全部</a>
                  </li>
                  <li v-for="item in catelist">
                      <a @click="getimglist(item.id)">{{item.title}}</a>
                  </li>
              </ul>
          </div>

        <!--2.0 图片列表-->
        <div class="imglist">
            <ul>
                <li v-for="item in list">
                    <router-link v-bind='{to:"/photo/info/"+item.id}'>
                        <img v-lazy="item.img_url">
                    </router-link>
                    <p>
                        <span class="title" v-text="item.title"></span><br />
                        {{item.zhaiyao}}
                    </p>
                </li>
            </ul>

        </div>

</template>
<style scoped>

    /*懒加载图片样式begin*/
    .imglist p{
        color:#fff;
        position: absolute;
        bottom: 0px;
        left:0px;
        background-color: rgba(0,0,0,0.4);
    }
    .imglist .title{
        font-weight: bold;
    }
    .imglist ul{
        padding: 0;
    }
    .imglist li{
        list-style: none;
        position: relative;
    }
    .imglist img{
        width: 100%;
        height: 300px;
    }

    image[lazy=loading] {
        width: 100%;
        height: 300px;
        margin: auto;
    }
    /*懒加载图片样式end*/

    /*分类样式开始*/
    .cate{
        max-width: 400px;
        overflow-x:auto;
        overflow-y: hidden;
    }
    .cate ul{
        padding-left: 10px;
        width: 320px;
        margin: 0;
    }
   .cate li{
       list-style: none;
       display: inline-block;
       padding: 0 0 0 5px;
   }

   .cate li a{
        colr:#0094ff;
       font-size: 14px;
   }
    /*分类样式end*/
</style>
<script>
    import common from '../../kits/common.js';
    import { Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                catelist:[], //存储分类数据
                list:[]
            }
        },
        created(){
            this.getcate();
            this.getimglist(0); //默认加载全部图片
        },
        methods:{
           //1.0 获取图片的分类数据
            getcate(){
                let url = common.apihost +'/api/getimgcategory';
                this.$http.get(url).then(res=>{
                    this.catelist = res.body.message;

                // 重新根据当前分类的个数计算出整个ul的宽度，动态赋值
                let w = 60 * (res.body.message.length + 1);
                 document.getElementById('cateul').style.width = w+'px';
                });
            },
           //2.0 根据分类的id获取图片数据
            getimglist(cateid){
                //这里注意要先清空，否则会导致第一张图片不会被覆盖
                this.list = '';
                //这个位置应该提醒用户正在加载中
                Indicator.open('正在加载中...');

                let url = common.apihost +'/api/getimages/'+cateid;
                this.$http.get(url).then(res=>{
                    //由于服务器返回的img_url的地址只是路径的部分，所以我们应该拼接上图片云服务器的前缀
                    let imghost = common.imghost; //云服务器地址
                //遍历res.body.message
                let tmplist = res.body.message;
                for(let i = 0;i< tmplist.length;i++){
                    tmplist[i].img_url = imghost + tmplist[i].img_url;
                }

                this.list =  tmplist;

                //在这个位置关闭正在加载中的提示
                Indicator.close();
            });
            }
        }
    }
</script>
