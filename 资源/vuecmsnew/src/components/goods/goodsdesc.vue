<template>
    <div class="tmpl">
        <h3>{{info.title}}</h3>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<style scoped>
    .tmpl h3{
        color:#0094ff;
        padding: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }
   .tmpl{
       padding:5px;
   }
    .tmpl .content{
        margin-top: 10px;
    }
</style>
<script>
    import common from '../../kits/common.js'
    export default{
        data(){
            return{
               info:{}
            }
        },
        methods:{
           getinfo(){
                //1.0 获取商品id
               let id = this.$route.params.id;

               //2.0 请求服务器api获取图文消息
               let url = common.apihost+'/api/goods/getdesc/'+id;
               this.$http.get(url).then(res=>{
                this.info = res.body.message[0];
               });
           }
        },
        created(){
            this.getinfo();
        }
    }
</script>
