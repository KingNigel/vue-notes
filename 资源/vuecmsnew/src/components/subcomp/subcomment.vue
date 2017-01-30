<template>
    <div class="tmpl">
      <div class="submittitle">
          提交评论
      </div>
        <div class="submitarea">
            <textarea ref="postcontent" class="textarea" placeholder="请输入评论内容"></textarea>
            <mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
        </div>

        <div class="commenttitle">
            评论列表
        </div>
        <div class="commentlist">
            <div class="outwarp" v-for="item in comments">
                <div class="content" v-text="item.content"></div>
                <div class="user" v-text="item.user_name"></div>
                <div class="time">{{item.add_time | fmtdate('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>
            <!--<div class="outwarp">-->
                <!--<div class="content" >这是一条评论这是一条评论</div>-->
                <!--<div class="user">匿名用户</div>-->
                <!--<div class="time">2018-292-12</div>-->
            <!--</div>-->

        </div>

        <!--加载跟多按钮-->
        <mt-button class="more" type="danger" size="large" plain @click="getmore">加载更多</mt-button>

    </div>
</template>
<style scoped>
    .more{
        margin-top: 10px;
    }
    .tmpl{
        padding: 5px;
    }
   .submittitle,.commenttitle{
       font-weight: 700;
       font-size: 21px;
       border-bottom: 1px solid rgba(92,92,92,0.4);
       padding-bottom: 15px;
   }
    .submitarea{
        margin-top: 5px;
    }
    .commenttitle{
        margin-top: 10px;
        border-top: 1px solid rgba(92,92,92,0.4);
        padding: 10px 0px 10px 0;
    }
    .outwarp{
        border-bottom: 1px solid rgba(92,92,92,0.4);
        clear: both;
        max-height:300px;
        overflow-y: auto;
        padding: 5px;
    }
    .user,.time{
        width: 50%;
        float: left;
        color: #0094ff;
    }
    .time{
        float: right;
   }
</style>
<script>
    import common from '../../kits/common.js'
    import { Toast } from 'mint-ui'; //导入mint-ui中的提示组件

    export default{
        data(){
            return{
               comments:[], //用来存放当前数据的评论信息列表
                pageindex:1 //这是获取评论的页码，默认为第1页
            }
        },
        created(){
            this.getcomment(this.pageindex);
        }
        ,
        methods:{
           //1.0 提交评论
            postcomment(){
               let url = common.apihost+'/api/postcomment/'+this.artid;
                //如何去获取到或页面上的评论的内容可以通过  console.log(this.$refs.postcontent);
                //1.0 通过vue来获取textarea的值
                let contentText = this.$refs.postcontent.value;
                //判断是否有值
                if(!contentText || contentText.trim().length <=0){
                    Toast('评论内容必须填写');
                    return; //阻断这个方法下面的代码继续运行
                }
                //2.0 将评论数据提交到服务器
                this.$http.post(url,{content:contentText},{emulateJSON:true})
                        .then(res=>{
                    //利用mint-ui中的Toast 提示用户提交成功
                    Toast('评论提交成功');

                    //重新加载评论
                    this.getcomment(this.pageindex,true);

                    //清空文本空中的值
                this.$refs.postcontent.value = '';

                },res => {console.log('评论提交失败');});
            },
           //2.0 获取评论
            getcomment(pageindex,isreload){
                let url = common.apihost+'/api/getcomments/'+this.artid+'?pageindex='+pageindex;
                this.$http.get(url).then(res=>{
                    //由于我们要实现加载更多功能，所以这里不应该使最新数据覆盖数组，而是将最新数据追加到comments中
                    //this.comments = res.body.message;
                    //这种写法可能存在一个问题不会及时刷新页面
//                    this.comments = this.comments.concat(res.body.message);
                    if(isreload){
                        this.comments = res.body.message;
                    }else{
                        //这是给加载跟多使用的
                        this.comments = this.comments.concat(res.body.message);
                    }
                },res=>{
                    console.log('获取评论数据失败');
                });
            },
            //3.0 获取跟多数据
            getmore(){
                //1.0 将pageindex加一
                this.pageindex++;
                //2.0 讲自增以后的pageindex值传入getcomment方法即可获取数据
                this.getcomment(this.pageindex);
            }
        },
        props:['artid']  //用来接收当前评论数据的所属内容的id,这个值可以在vue对象中的任何地方使用
    }
</script>
