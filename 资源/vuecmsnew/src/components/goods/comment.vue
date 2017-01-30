<template>
    <div class="tmpl">
        <subcomment :artid="goodsid"></subcomment>
    </div>
</template>
<style scoped>
   
</style>
<script>
    import subcomment from '../subcomp/subcomment.vue'

    export default{
        data(){
            return{
                goodsid:0 //商品的id
            }
        },
        methods:{
           
        },
        created(){
            this.goodsid = this.$route.params.id;
        },
        components:{
            subcomment
        }
    }
</script>
