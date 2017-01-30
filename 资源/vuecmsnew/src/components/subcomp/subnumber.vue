<template>
    <div class="subtmpl">
        <div class="left" @click="substrict">-</div>
        <div class="middle">{{resObj.count}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>
<style scoped>
   .subtmpl div{
        padding: 5px;
        border: 1px solid rgba(92,92,92,0.3);
        display: inline-block;
    }

  .left,.right,.middle{
       width: 30px;
       height: 25px;
      line-height: 15px;
      text-align: center;
   }
    .middle{
        width: 40px;
        margin-bottom: 10px;
    }

</style>
<script>
    const ADD ='add';
    const SUBSTRICT ='substrict';

    export default{
        data(){
            return{
                resObj:{type:ADD,goodsid:0,count:0}
            }
        },
        props:['initcount','goodsid'], //initcount:购物车中选择当前商品的数量  ，goodsid代表购物车商品的id
        created(){
          this.resObj.count = this.initcount>1?this.initcount:1;
            this.resObj.goodsid = this.goodsid>0?this.goodsid:0;
        },
        methods:{
            //1.0 加1
           add(){
                this.resObj.count++;
               this.resObj.type=ADD;
                this.notiflycount();
           },
            //2.0 减1
            substrict(){
                //保证自减到1为止
                if(this.resObj.count <= 1){
                    this.resObj.count = 1;
                    return;
                }
                this.resObj.count--;
                this.resObj.type=SUBSTRICT;
                this.notiflycount();
            },
            //3.0 将最新的对象传入给父组件
            notiflycount(){
                let key = 'count';
                this.$emit(key,this.resObj); //当执行了这个代码以后，就会自动触发goodsinfo.vue中的getcount()
            }
        }
    }
</script>
