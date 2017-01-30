<template>
    <div class="subtmpl">
        <!-- 利用mint-ui中的swipe组件实现轮播图 -->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(item,index) in imagelist" :key="index">
                <img class="img" :src="item.img" alt="轮播图">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<style scoped>


    .img{
        width:100%;
        height:100%;
    }
    .mint-swipe {
        overflow: hidden;
        position: relative;
        height:250px;
    }
    .mint-swipe-items-wrap {
        position: relative;
        overflow: hidden;
        height: 100%;
    }
    .mint-swipe-items-wrap > div {
        position: absolute;
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
        width: 100%;
        height: 100%;
        display: none;
        /*background-color: red;*/
    }
    .mint-swipe-items-wrap > div.is-active {
        display: block;
        -webkit-transform: none;
        transform: none;
    }
    .mint-swipe-indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .mint-swipe-indicator {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #000;
        opacity: 0.2;
        margin: 0 3px;
    }
    .mint-swipe-indicator.is-active {
        background: #fff;
    }

</style>
<script>

    export default{
        data(){
            return{

            }
        },
        props:['imagelist']  //这个数据是从父组件传入进来的

    }
</script>
