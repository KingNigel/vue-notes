<template>
    <div class="tmpl">
      <!--{{ this.$route.params.id }}-->
        <div class="title">
            <p class="ptitle">
                {{article.title}}
            </p>
            <p class="otitle">
                {{article.add_time | fmtdate('YYYY-MM-DD')}}
                {{article.click}}次浏览
                分类：经济民生
            </p>
        </div>
        <div class="content" v-html = "article.content">

        </div>
<!--3.0 评论组件的使用-->
        <div>
            <subcomment :artid="artid"></subcomment>
        </div>
    </div>
</template>
<style scoped>
   .title{
       height: 100%;
       border-bottom: 2px solid rgba(92,92,92,0.1);
       padding: 5px;
   }

    .title .ptitle{
        font-size: 16px;
        font-weight: bold;
        color:#0094ff;
    }
    .title .otitle{
        font-size:12px;
        color:rgba(92,92,92,0.6);
    }
    .content{
        padding: 5px;
    }

</style>
<script>
    import common from '../../kits/common.js';
    //1.0 导入评论组件
    import subcomment from '../subcomp/subcomment.vue'

    export default{
        data(){
            return{
                article:{},
                artid:0 // 3.0 定义评论组件要接收的id值
            }
        },
        components:{
            subcomment // 2.0 将评论组件注册为私有组件
        },
        created(){
            this.getdata();
            //4.0 获取到url传入过来的id值
            this.artid = this.$route.params.id;
        },
        methods:{
           getdata(){
            //负责根据传入的id值从 /api/getnew/:newid 去获取到真正的数据
            // 1.0  获取到url传入的id值
            let id  = this.$route.params.id;
            //2.0 拼接url
            let url =common.apihost +'/api/getnew/' + id;

            //3.0 ajax请求获得数据
            this.$http.get(url).then(res=>{
                //获取图文资讯对象，但是message是一个数组，所以应该取0索引位置数据
                this.article  =res.body.message[0];

        },res=>{console.log('获取图文资讯详情失败')});
        }
    }
    }
</script>
