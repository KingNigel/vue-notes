<template>
    <div class="tmpl">
        <!--1.0 标题-->
        <div class="title">
            <h2>{{imgdata.title}}</h2>
            <p class="otitle">
                {{imgdata.add_time | fmtdate('YYYY-MM-DD')}}
                {{imgdata.click}}次浏览
            </p>
        </div>
        <!--2.0 使用MUI中的9宫格实现属于这个图片的其他相关图片-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(item, index) in imglist"
                class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <img class="preview-img"
                     :src="item.src" height="100" @click="$preview.open(index, imglist)">
            </li>
        </ul>
        <!--3.0 展示图片的详细先描述-->
        <div class="content" v-html="imgdata.content">
        </div>
        <!--4.0 这个图片的评论组件-->
        <subcomment :artid="imgid"></subcomment>
    </div>
</template>
<style scoped>
   .tmpl .title{
        padding: 10px;
       border-bottom: 2px solid rgba(92,92,92,0.2);
    }
   .title h2{
       color: #0094ff;
       font-size: 16px;
   }
   .title .otitle{
       font-size:12px;
       color:rgba(92,92,92,0.6);
   }

    /*9宫格样式重写*/
   .mui-grid-view.mui-grid-9{
       background-color: #fff;
   }
   .mui-grid-view.mui-grid-9 .mui-table-view-cell{
       border-bottom: none;
       border-right:none;
   }
   .mui-grid-view.mui-grid-9 .mui-table-view-cell{
       padding: 5px;;
   }
   .mui-grid-view.mui-grid-9 .mui-table-view-cell > a:not(.mui-btn){
       padding: 0;
   }

    /*图片描述样式*/
    .content{
        padding: 5px;
        color:#5c5c5c;
    }
</style>
<script>
    import common from '../../kits/common.js';
    //1.0 导入图片组件
    import subcomment from '../subcomp/subcomment.vue';

    export default{
        data(){
            return{
               imgdata:{},//代表这张图片数据的详细描述信息
                 imglist: [], //9宫格图片存储数组
                imgid:0 //传入到评论组件中的图片id
            }
        },
        created(){
            this.getimgdata(); //根据图片id获取到图片的详细数据对象
            this.getthumbimgs(); //获取9宫格中的图片
            //将图片id初始化
            this.imgid = this.$route.params.id;
        },
        components:{
            subcomment //将评论组件注册
        },
        methods:{
            getimgdata(){
                //1.0 获取到图片的id
                let id = this.$route.params.id;
                //2.0 发出ajax请求获取到数据
                let url = common.apihost + '/api/getimageInfo/' + id;
                this.$http.get(url).then(res=>{
                   this.imgdata =  res.body.message[0];
                });
            },
            getthumbimgs(){
                //1.0 获取到图片的id
                let id = this.$route.params.id;
                let url = common.apihost + '/api/getthumimages/' + id;
                let imghost = common.imghost; //图片云服务器的域名
                this.$http.get(url).then(res=>{
                   //2.0 res.body.message中返回的是一个数组[{src:'/upload/...'}]
                    res.body.message.forEach(item=>{
                        item.src = imghost+item.src;
                        //由于服务器没有返回图片的高和宽，而vue-preview组件要求数据有h和w所以要动态添加
                        item.h=400;
                        item.w = 600;
                    });

                    //3.0 强res.body.message 赋值给imglist
                    this.imglist = res.body.message;
                });
            }
        }
    }
</script>
