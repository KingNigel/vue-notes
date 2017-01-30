<template>
    <div class="tmpl">
        <p>
       用户名: <input type="text" placeholder="请输入用户名" ref="uname">
        </p>
        <p>
       密码： <input type="password" placeholder="请输入密码" ref="upwd">
        </p>
        <p>
        <mt-button type="danger" size="large" @click="login">登录</mt-button>
        </p>
    </div>
</template>
<style scoped>
   .tmpl{
       padding: 5px;
   }
</style>
<script>
    import { Toast } from 'mint-ui';
    import {setUserId} from '../../kits/loginHelper.js'
    export default{
        data(){
            return{
               
            }
        },
        methods:{
            login(){
                //1.0 获取页面上的输入值
                let username = this.$refs.uname.value;
                let upwd = this.$refs.upwd.value;

                //2.0 将用户名和密码发送给api判断是否正确,这里由于没有api所以我们做一个假的
                let userid =0;
                if(username =='ivan'&& upwd=='123'){
                    //1.0 将userid的值存储到sessionStorage中
                    userid = 1;
                    setUserId(userid);

                    // 2.0 跳转到购物车页面
                    this.$router.push({name:'shopcar'});

                }else{
                    Toast('用户名或者密码错误，请重新输入');
                }
            }
        }
    }
</script>
